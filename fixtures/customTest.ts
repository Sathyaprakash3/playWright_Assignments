import { test as base, Page } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { ProductTablePage } from '../pages/ProductTablePage';
import { TablePage } from '../pages/TablePage';

/**
 * Extended test fixture with isolated page objects
 * Each test gets fresh instances ensuring complete isolation
 */
export const test = base.extend<{
  dashboardPage: DashboardPage;
  productTablePage: ProductTablePage;
  tablePage: TablePage;
}>({
  dashboardPage: async ({ page }, use) => {
    // Reset page state before test
    await page.goto('about:blank');
    const dashboardPage = new DashboardPage(page);
    
    await use(dashboardPage);
    
    // Cleanup after test
    await page.goto('about:blank');
  },
  
  productTablePage: async ({ page }, use) => {
    // Reset page state before test
    await page.goto('about:blank');
    const productTablePage = new ProductTablePage(page);
    
    await use(productTablePage);
    
    // Cleanup after test
    await page.goto('about:blank');
  },
  
  tablePage: async ({ page }, use) => {
    // Reset page state before test
    await page.goto('about:blank');
    const tablePage = new TablePage(page);
    
    await use(tablePage);
    
    // Cleanup after test
    await page.goto('about:blank');
  },
});

export { expect } from '@playwright/test';
