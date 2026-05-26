import { Page } from '@playwright/test';
import { testData } from '../fixtures/testData';

/**
 * Navigate to table with isolation
 * Uses environment variables for URLs
 */
export async function goToTable(page: Page) {
  const dashboardUrl = process.env.LEAFGROUND_DASHBOARD_URL || 'https://www.leafground.com/dashboard.xhtml';
  await page.goto(dashboardUrl);
  await page.waitForLoadState(testData.waitStates.loadState as any);
  await page.locator("//i[@class='pi pi-table layout-menuitem-icon']").click();
  await page.getByRole('menu').getByRole('menuitem', { name: 'Table' }).click();
}

/**
 * Navigate to dynamic grid with isolation
 */
export async function goToDynamicGrid(page: Page) {
  const dashboardUrl = process.env.LEAFGROUND_DASHBOARD_URL || 'https://www.leafground.com/dashboard.xhtml';
  await page.goto(dashboardUrl);
  await page.waitForLoadState(testData.waitStates.loadState as any);
  await page.locator("//i[@class='pi pi-table layout-menuitem-icon']").click();
  await page.getByRole('menu').getByRole('menuitem', { name: 'Dynamic Grid' }).click();
}

/**
 * Get column text contents with null safety
 */
export async function getColumnTextContents(page: Page, selector: string) {
  await page.waitForSelector(selector, { state: 'visible' });
  return await page.locator(selector).allTextContents();
}

/**
 * Get table row count with validation
 */
export async function getTableRowCount(page: Page, selector: string) {
  await page.waitForSelector(selector, { state: 'visible' });
  return await page.locator(selector).count();
}

/**
 * Get table cell text with bounds checking
 */
export async function getTableCellText(page: Page, rowSelector: string, rowIndex: number, cellSelector: string) {
  const rows = page.locator(rowSelector);
  const rowCount = await rows.count();
  
  if (rowIndex >= rowCount) {
    throw new Error(`Row index ${rowIndex} is out of bounds. Total rows: ${rowCount}`);
  }
  
  return await rows.nth(rowIndex).locator(cellSelector).textContent();
}

/**
 * Navigate to home page and reset state
 */
export async function navigateToHome(page: Page) {
  const baseUrl = process.env.LEAFGROUND_BASE_URL || 'https://www.leafground.com/';
  await page.goto(baseUrl);
  await page.waitForLoadState(testData.waitStates.loadState as any);
}

/**
 * Wait for network idle with configurable timeout
 */
export async function waitForNetworkIdle(page: Page, timeout: number = testData.timeouts.long) {
  await page.waitForLoadState(testData.waitStates.loadState as any);
}

