import { test, expect } from '@playwright/test';

test('playwright docs - verify title contains', async ({ page }) => {
  // Setup: Navigate to Playwright documentation
  await page.goto('https://playwright.dev/');
  
  // Assert: Verify page title
  await expect(page).toHaveTitle(/Playwright/);
});

test('playwright docs - verify get started link navigation', async ({ page }) => {
  // Setup: Navigate to Playwright documentation
  await page.goto('https://playwright.dev/');
  
  // Test: Click get started link
  await page.getByRole('link', { name: 'Get started' }).click();
  
  // Assert: Verify installation heading is visible
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
