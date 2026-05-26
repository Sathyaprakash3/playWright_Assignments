import { test, expect } from '../../fixtures/customTest';
import { testData } from '../../fixtures/testData';

test('dynamic table sorting - verify column sort functionality', async ({ dashboardPage, tablePage, page }) => {
  // Setup: Navigate to base URL
  const baseUrl = process.env.LEAFGROUND_BASE_URL || 'https://www.leafground.com/';
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  // Test: Navigate to dynamic grid
  await dashboardPage.tableMenuIcon.waitFor({ state: 'visible' });
  await dashboardPage.tableMenuIcon.click();
  await dashboardPage.dynamicGridMenuLink.click();
  await page.waitForLoadState('networkidle');
  
  // Test: Click customer name column header to sort
  await tablePage.customerNameColumnHeader.click();
  await page.waitForTimeout(testData.timeouts.medium);
  
  // Assert: Verify sorting is correct
  const elements = await tablePage.customerNameCells.allTextContents();
  const sortedElements = [...elements].sort();
  expect(elements).toEqual(sortedElements);
  
  // Test: Log row activities for verification
  const rowCount = await tablePage.tableRows.count();
  console.log(`Total rows in table: ${rowCount}`);
  
  for (let i = 0; i < Math.min(rowCount, 5); i++) {
    const activity = await tablePage.tableRows.nth(i).locator('td:nth-child(4)').textContent();
    console.log(`Row ${i + 1}: ${activity}`);
  }
});