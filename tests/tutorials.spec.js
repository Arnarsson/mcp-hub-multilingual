const { test } = require('@playwright/test');

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

test.describe('Tutorial recordings', () => {
  test('Filesystem', async ({ page }) => {
    await page.goto('/index.html');
    await openAndRun(page, 'filesystem');
  });

  // Other demos not needed for prototype
}); 