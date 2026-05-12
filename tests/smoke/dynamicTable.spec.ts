import { test, expect } from '../../fixtures/customTest';
test('dynamic table sorting', async ({ dashboardPage, tablePage, page }) => {
  await page.goto(process.env.LEAFGROUND_BASE_URL || "https://www.leafground.com/");
  await dashboardPage.tableMenuIcon.click();
  await dashboardPage.dynamicGridMenuLink.click();
  await tablePage.customerNameColumnHeader.click();
  await tablePage.page.waitForTimeout(5000);
  const elements = await tablePage.customerNameCells.allTextContents();
  const sortedElements = [...elements].sort();
  expect(elements).toEqual(sortedElements);

  const rowCount = await tablePage.tableRows.count();
  for (let i = 0; i < rowCount; i++) {
    const activity = await tablePage.tableRows.nth(i).locator('td:nth-child(4)').textContent();
    console.log(`Row ${i + 1}: ${activity}`);
  }
});