export const ProductTablePageLocators = {
  idCells: "//tbody[@id='productsTable_data']/tr/td[1]",
  nextPageBtn: { role: 'link', name: 'Next Page' },
  rowById: (id: string) => `//tbody[@id='productsTable_data']/tr[td[1][text()='${id}']]`,
  statusById: (id: string) => `#productsTable_data tr td:contains('${id}') ~ td span.status-instock`,
};
