// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3100',
    video: { mode: 'on', size: { width: 1280, height: 720 } },
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    }
  ],
  outputDir: 'public/videos',
  webServer: {
    command: 'npx serve public -l 3100 --single',
    url: 'http://localhost:3100',
    reuseExistingServer: true,
    timeout: 10000
  }
};
module.exports = config; 