import { Page } from '@playwright/test';

export async function goToTable(page: Page) {
  await page.goto('https://www.leafground.com/dashboard.xhtml');
  await page.locator("//i[@class='pi pi-table layout-menuitem-icon']").click();
  await page.getByRole('menu').getByRole('menuitem', { name: 'Table' }).click();
}

export async function goToDynamicGrid(page: Page) {
  await page.goto('https://www.leafground.com/dashboard.xhtml');
  await page.locator("//i[@class='pi pi-table layout-menuitem-icon']").click();
  await page.getByRole('menu').getByRole('menuitem', { name: 'Dynamic Grid' }).click();
}

export async function getColumnTextContents(page: Page, selector: string) {
  return await page.locator(selector).allTextContents();
}

export async function getTableRowCount(page: Page, selector: string) {
  return await page.locator(selector).count();
}

export async function getTableCellText(page: Page, rowSelector: string, rowIndex: number, cellSelector: string) {
  const rows = page.locator(rowSelector);
  return await rows.nth(rowIndex).locator(cellSelector).textContent();
}
