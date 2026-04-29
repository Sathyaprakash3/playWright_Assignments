import { Page, Locator } from '@playwright/test';
import { TablePageLocators } from '../locators/tablePageLocators';

export class TablePage {
  readonly page: Page;
  readonly tableHeader: Locator;
  readonly page2Link: Locator;
  readonly page2Aria: Locator;
  readonly customerNameColumnHeader: Locator;
  readonly customerNameCells: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableHeader = page.locator(TablePageLocators.tableHeader);
    this.page2Link = page.getByRole(TablePageLocators.page2Link.role as any, { name: TablePageLocators.page2Link.name });
    this.page2Aria = page.locator(TablePageLocators.page2Aria);
    this.customerNameColumnHeader = page.getByRole(TablePageLocators.customerNameColumnHeader.role as any, { name: TablePageLocators.customerNameColumnHeader.name });
    this.customerNameCells = page.locator(TablePageLocators.customerNameCells);
    this.tableRows = page.locator(TablePageLocators.tableRows);
  }
}
