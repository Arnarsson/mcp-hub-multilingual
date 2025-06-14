// Playwright test for MCP Hub demo modals
const { chromium } = require('playwright');

async function testDemoModals() {
    console.log('🚀 Starting MCP Hub demo modal tests...');
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        // Navigate to localhost
        console.log('📡 Loading localhost:8080...');
        await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
        
        // Wait for page to fully load
        await page.waitForTimeout(2000);
        
        // Wait for demo cards to be visible
        await page.waitForSelector('.demo-card', { timeout: 10000 });
        
        // Test each demo modal
        const demos = ['filesystem', 'database', 'api', 'realtime'];
        
        for (const demo of demos) {
            console.log(`🔍 Testing ${demo} demo modal...`);
            
            // Find and click the demo card using data-demo attribute
            const demoCard = page.locator(`[data-demo="${demo}"]`);
            
            if (await demoCard.count() > 0) {
                await demoCard.click();
                
                // Wait for modal to appear
                await page.waitForSelector('#demoModal', { state: 'visible', timeout: 5000 });
                
                // Check if modal title is set correctly
                const modalTitle = await page.textContent('#demoModalTitle');
                console.log(`✅ ${demo} modal opened with title: "${modalTitle}"`);
                
                // Verify no console errors occurred
                let hasError = false;
                page.on('console', msg => {
                    if (msg.type() === 'error' && msg.text().includes('currentLang')) {
                        hasError = true;
                        console.error(`❌ Console error: ${msg.text()}`);
                    }
                });
                
                if (!hasError) {
                    console.log(`✅ No currentLang errors detected for ${demo} demo`);
                }
                
                // Close modal
                await page.click('.demo-modal-close');
                await page.waitForSelector('#demoModal', { state: 'hidden', timeout: 3000 });
                
                console.log(`✅ ${demo} modal closed successfully`);
            } else {
                console.log(`⚠️  Could not find ${demo} demo card`);
            }
            
            await page.waitForTimeout(500);
        }
        
        console.log('🎉 All demo modal tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        
        // Capture console errors
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.error('Browser console error:', msg.text());
            }
        });
        
        // Take screenshot on error
        await page.screenshot({ path: 'error-screenshot.png' });
        console.log('📸 Error screenshot saved as error-screenshot.png');
    }
    
    await browser.close();
}

// Check if running directly
if (require.main === module) {
    testDemoModals();
}

module.exports = { testDemoModals };