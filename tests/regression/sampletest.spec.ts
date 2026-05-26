import { test, expect } from '../../fixtures/customTest';
import { testData } from '../../fixtures/testData';

test('samplemenu - verify drag menu navigation', async ({ dashboardPage, page }) => {
  // Setup: Navigate to dashboard
  const dashboardUrl = process.env.LEAFGROUND_DASHBOARD_URL || 'https://www.leafground.com/dashboard.xhtml';
  await page.goto(dashboardUrl);
  await page.waitForLoadState('networkidle');
  
  // Test: Click globe menu and drag link
  await dashboardPage.globeMenuIcon.click();
  await dashboardPage.dragMenuLink.click();
  await page.waitForTimeout(testData.timeouts.medium);
  
  // Assert: Verify draggable page loaded
  await expect(page.locator("//h4[normalize-space()='Draggable']")).toBeVisible();
});

test('asserting the value in the table - verify product status', async ({ productTablePage, page }) => {
  // Setup: Navigate to base URL
  const baseUrl = process.env.LEAFGROUND_BASE_URL || 'https://www.leafground.com/';
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  
  // Test: Find product and verify status
  let found = false;
  let currentPage = 0;
  const maxPages = 10; // Prevent infinite loops
  
  while (!found && currentPage < maxPages) {
    const ids = await productTablePage.idCells.allTextContents();
    
    for (let i = 0; i < ids.length; i++) {
      if (ids[i].includes(testData.table.expectedProductId)) {
        found = true;
        const status = productTablePage.statusById(testData.table.expectedProductId);
        
        // Assert: Verify status text and styling
        await expect(status).toHaveText(testData.table.expectedStatus);
        await expect(status).toHaveCSS('background-color', testData.table.expectedStatusBg);
        await expect(status).toHaveCSS('color', testData.table.expectedStatusColor);
        break;
      }
    }
    
    if (found) break;
    
    // Navigate to next page if available
    const nextBtn = productTablePage.nextPageBtn;
    const isDisabled = await nextBtn.getAttribute('class');
    
    if (isDisabled?.includes('ui-state-disabled')) {
      break;
    }
    
    await nextBtn.click();
    await page.waitForTimeout(testData.timeouts.short);
    await page.waitForLoadState('networkidle');
    currentPage++;
  }
  
  // Assert: Product was found
  expect(found).toBeTruthy();
});
