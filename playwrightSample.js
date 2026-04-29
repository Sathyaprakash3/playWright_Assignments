// playwrightSample.js
// Sample Playwright script for browser automation

const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to example page
  await page.goto('https://example.com');

  // Take a screenshot
  await page.screenshot({ path: 'example.png' });

  // Print the page title
  const title = await page.title();
  console.log('Page title:', title);

  // Close browser
  await browser.close();
})();
