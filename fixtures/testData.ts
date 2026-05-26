/**
 * Centralized test data management
 * Keeps ONLY test constants and expected values
 * 
 * URLs and credentials are loaded from .env file
 */

export const testData = {
  // Test credentials (from .env, but kept here for easy reference)
  credentials: {
    username: 'emilys',
    password: 'emilyspass',
  },

  // Default timeouts for test synchronization
  timeouts: {
    short: 2000,
    medium: 5000,
    long: 10000,
  },

  // Expected test data values for assertions
  table: {
    expectedProductId: '1012',
    expectedStatus: 'INSTOCK',
    expectedStatusBg: 'rgb(200, 230, 201)',
    expectedStatusColor: 'rgb(37, 96, 41)',
  },

  // Wait conditions
  waitStates: {
    loadState: 'networkidle',
  },
};

/**
 * Helper function to get URLs from environment variables
 * All URLs come from .env file
 */
export function getTestUrls() {
  return {
    baseUrl: process.env.LEAFGROUND_BASE_URL || 'https://www.leafground.com/',
    dashboardUrl: process.env.LEAFGROUND_DASHBOARD_URL || 'https://www.leafground.com/dashboard.xhtml',
    dummyJsonApi: process.env.DUMMYJSON_PRODUCTS_URL || 'https://dummyjson.com/products',
    authUrl: process.env.DUMMYJSON_AUTH_URL || 'https://dummyjson.com/auth/login',
  };
}

/**
 * Helper function to reset data for each test
 */
export function getIsolatedTestData() {
  return { ...testData };
}
