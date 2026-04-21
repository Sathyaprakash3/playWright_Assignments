import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { ProductTablePage } from '../pages/ProductTablePage';
import { TablePage } from '../pages/TablePage';

// Extend base test with custom fixtures for all pages
export const test = base.extend<{
  dashboardPage: DashboardPage;
  productTablePage: ProductTablePage;
  tablePage: TablePage;
}>({
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  productTablePage: async ({ page }, use) => {
    await use(new ProductTablePage(page));
  },
  tablePage: async ({ page }, use) => {
    await use(new TablePage(page));
  },
});

export { expect } from '@playwright/test';
