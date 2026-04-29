export const TablePageLocators = {
  tableHeader: "//span[text()='Customer Analytics Table']",
  page2Link: { role: 'link', name: 'Page 2' },
  page2Aria: '[aria-label="Page 2"]',
  customerNameColumnHeader: { role: 'columnheader', name: 'NAME' },
  customerNameCells: "#form\\:customers_data tr td:nth-child(1)",
  tableRows: '#form\\:customers_data tr',
};
