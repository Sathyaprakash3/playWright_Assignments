import { test, expect } from '../../fixtures/customTest';
test('samplemenu', async ({ dashboardPage, page }) => {
  await page.goto('https://www.leafground.com/dashboard.xhtml');
  await dashboardPage.globeMenuIcon.click();
  await dashboardPage.dragMenuLink.click();
  await page.waitForTimeout(5000);
  await expect(page.locator("//h4[normalize-space()='Draggable']")).toBeVisible();
});

test('table', async ({ dashboardPage, tablePage }) => {
  await dashboardPage.tableMenuIcon.click();
  await dashboardPage.tableMenuLink.click();
  await expect(tablePage.tableHeader).toHaveText('Customer Analytics Table');
  await tablePage.page2Link.click();
  await tablePage.page.waitForTimeout(5000);
  const page2Class = await tablePage.page2Aria.getAttribute('class');
  expect(page2Class).toMatch(/ui-state-active/);
});



test.only('asserting the value in the tabe', async ({ productTablePage, page }) => {
  await page.goto("https://www.leafground.com/");
  let found = false;
  while (!found) {
    const ids = await productTablePage.idCells.allTextContents();
    for (let i = 0; i < ids.length; i++) {
      if (ids[i].includes("1012")) {
        found = true;
        const status = productTablePage.statusById("1012");
        await expect(status).toHaveText("INSTOCK");
        await expect(status).toHaveCSS('background-color', 'rgb(200, 230, 201)');
        await expect(status).toHaveCSS('color', 'rgb(37, 96, 41)');
        break;
      }
    }
    if (found) break;
    if (await productTablePage.nextPageBtn.getAttribute('class').then(c => c?.includes('ui-state-disabled'))) {
      break;
    }
    await productTablePage.nextPageBtn.click();
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
  }
});
