import { Page, Locator } from '@playwright/test';
import { DashboardPageLocators } from '../locators/dashboardPageLocators';

export class DashboardPage {
  readonly page: Page;
  readonly globeMenuIcon: Locator;
  readonly tableMenuIcon: Locator;
  readonly dragMenuLink: Locator;
  readonly tableMenuLink: Locator;
  readonly dynamicGridMenuLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.globeMenuIcon = page.locator(DashboardPageLocators.globeMenuIcon);
    this.tableMenuIcon = page.locator(DashboardPageLocators.tableMenuIcon);
    this.dragMenuLink = page.getByRole(DashboardPageLocators.dragMenuLink.role as any, { name: DashboardPageLocators.dragMenuLink.name });
    this.tableMenuLink = page.getByRole('menu').getByRole(DashboardPageLocators.tableMenuLink.role as any, { name: DashboardPageLocators.tableMenuLink.name });
    this.dynamicGridMenuLink = page.getByRole('menu').getByRole(DashboardPageLocators.dynamicGridMenuLink.role as any, { name: DashboardPageLocators.dynamicGridMenuLink.name });
  }
}
