/**
 * Searches for a value in a paginated table and returns the row locator if found, otherwise null.
 * @param page Playwright Page object
 * @param idToFind The value to search for in the first column
 * @param tableRowSelector XPath or selector for table rows
 * @param nextPageRoleName The accessible name for the next page button (default: 'Next Page')
 * @returns Locator for the row if found, otherwise null
 */
export async function findValueInPaginatedTable(page: Page, idToFind: string, tableRowSelector: string, nextPageRoleName = 'Next Page') {
  while (true) {
    const ids = await page.locator(tableRowSelector).allTextContents();
    for (let i = 0; i < ids.length; i++) {
      if (ids[i].includes(idToFind)) {
        // Return the row locator
        return page.locator(`//tbody[@id='productsTable_data']/tr[td[1][text()='${idToFind}']]`);
      }
    }
    // Go to next page
    const nextBtn = page.getByRole('link', { name: nextPageRoleName });
    if (await nextBtn.getAttribute('class')?.then(c => c?.includes('ui-state-disabled'))) {
      break;
    }
    await nextBtn.click();
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
  }
  return null;
}
import { Page } from '@playwright/test';

export async function goToPage(page: Page, pageName: string) {
  await page.getByRole('link', { name: pageName }).click();
}

export async function isPageActive(page: Page, ariaLabel: string) {
  return await page.locator(`[aria-label="${ariaLabel}"]`).getAttribute('class');
}
