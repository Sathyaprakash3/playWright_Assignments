import { chromium,test,expect } from "@playwright/test";
test('samplemenu',async() =>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto('https://www.leafground.com/dashboard.xhtml');
    await page1.locator("//i[@class='pi pi-globe layout-menuitem-icon']").click();
    await page1.getByRole('link', { name: ' Drag' }).click();
    await page1.waitForTimeout(5000);
    await expect(page1.locator("//h4[normalize-space()='Draggable']")).toBeVisible();
})

test.only('table',async({page}) =>{
    await page.goto('https://www.leafground.com/dashboard.xhtml');
    await page.locator("//i[@class='pi pi-table layout-menuitem-icon']").click();
    await page.getByRole('menu').getByRole('menuitem', { name: 'Table' }).click();
    const tableheader = page.locator("//span[text()='Customer Analytics Table']");
    await expect(tableheader).toHaveText('Customer Analytics Table');
    await page.getByRole('link', { name: 'Page 2' }).click();
    await page.waitForTimeout(5000);
    await expect(
  page.locator('[aria-label="Page 2"]')
).toHaveClass(/ui-state-active/);

})

test('dynamic table sorting',async({page}) => {
    await page.goto('https://www.leafground.com/dashboard.xhtml');

})
