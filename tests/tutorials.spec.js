const { test, expect } = require('@playwright/test');

async function openAndRun(page, demoType) {
  // Wait until the demo script is loaded and function exists
  const card = page.locator(`[data-demo="${demoType}"]`);
  await card.waitFor({ state: 'attached' });
  await card.scrollIntoViewIfNeeded();
  await card.click();
  // Wait for modal animation
  await page.waitForSelector('#demoModal.active');
  // Click first story-action button if exists
  const btn = await page.$('.story-action-btn');
  if (btn) {
    await btn.click();
  }
  // If question chips exist (database demo)
  const chip = await page.$('.question-chip');
  if (chip) {
    await chip.click();
  }
  // Let the animation run and be captured
  await page.waitForTimeout(6000);
  await page.keyboard.press('Escape');
}

test.describe('Homepage and Blog UX/UI', () => {
  test('Homepage loads and blog cards work', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page).toHaveTitle(/MCP/i);
    
    // Check blog cards exist and have proper data attributes
    const cards = await page.$$('.blog-card');
    expect(cards.length).toBeGreaterThan(0);
    
    // Test first blog card navigation only
    const firstCard = cards[0];
    if (firstCard) {
      const blogId = await firstCard.getAttribute('data-blog');
      expect(blogId).toBeTruthy();
      
      // Test that the blog page exists
      const blogUrl = `/blog/${blogId}.html`;
      const blogResponse = await page.request.get(blogUrl);
      expect(blogResponse.status()).toBeLessThan(400);
      
      // Test card click navigation
      await firstCard.click();
      await page.waitForLoadState('load');
      await expect(page).toHaveURL(new RegExp(`blog/${blogId}`));
      
      // Check blog page structure
      const hasMain = await page.$('main, [role="main"], .blog-content, .article-content');
      expect(hasMain).not.toBeNull();
      
      // Go back for other tests
      await page.goto('/index.html');
    }
    
    // Re-fetch cards after navigation and check structure
    const refreshedCards = await page.$$('.blog-card');
    for (let i = 0; i < refreshedCards.length; i++) {
      const card = refreshedCards[i];
      const blogId = await card.getAttribute('data-blog');
      const title = await card.$('.blog-title');
      const excerpt = await card.$('.blog-excerpt');
      
      expect(blogId).toBeTruthy();
      expect(title).not.toBeNull();
      expect(excerpt).not.toBeNull();
    }
  });

  test('Check for broken images', async ({ page }) => {
    await page.goto('/index.html');
    const imgs = await page.$$('img');
    for (const img of imgs) {
      const src = await img.getAttribute('src');
      const res = await page.request.get(src);
      expect(res.status()).toBeLessThan(400);
    }
  });

  test('Responsive layout', async ({ page }) => {
    await page.goto('/index.html');
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    await page.screenshot({ path: 'output/homepage-mobile.png' });
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await page.screenshot({ path: 'output/homepage-desktop.png' });
  });
});

test.describe('Tutorial recordings', () => {
  test('Filesystem', async ({ page }) => {
    await page.goto('/index.html');
    await openAndRun(page, 'filesystem');
  });

  // Other demos not needed for prototype
}); 