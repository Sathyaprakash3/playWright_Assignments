import { Page, Locator } from '@playwright/test';
import { ProductTablePageLocators } from '../locators/productTablePageLocators';

export class ProductTablePage {
  readonly page: Page;
  readonly idCells: Locator;
  readonly rowById = (id: string) => this.page.locator(ProductTablePageLocators.rowById(id));
  readonly statusById = (id: string) => this.page.locator(`//tbody[@id='productsTable_data']/tr[td[1][text()='${id}']]/td/span[contains(@class, 'status-instock')]`);
  readonly nextPageBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.idCells = page.locator(ProductTablePageLocators.idCells);
    this.nextPageBtn = page.getByRole(ProductTablePageLocators.nextPageBtn.role as any, { name: ProductTablePageLocators.nextPageBtn.name });
  }
}
