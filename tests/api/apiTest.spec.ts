import test, { expect } from '@playwright/test';
import { testData } from '../../fixtures/testData';

test('api sample - verify product data consistency', async ({ request }) => {
  // Setup: Fetch products list
  const dummyJsonApi = process.env.DUMMYJSON_PRODUCTS_URL || 'https://dummyjson.com/products';
  const response = await request.get(dummyJsonApi);
  const body = await response.json();
  
  // Assert: Verify response is successful
  expect(response.status()).toBe(200);
  expect(body.products).toBeDefined();
  expect(body.products.length).toBeGreaterThan(0);
  
  // Test: Verify first 5 products data consistency
  console.log(`Testing first 5 products from ${dummyJsonApi}`);
  
  for (let i = 1; i <= 5 && i < body.products.length; i++) {
    const productFromList = body.products[i];
    const productId = productFromList.id;
    
    // Get product by ID
    const responseForID = await request.get(`${dummyJsonApi}/${productId}`);
    const productBody = await responseForID.json();
    
    // Assert: Verify product details match
    expect(responseForID.status()).toBe(200);
    expect(productBody.price).toBe(productFromList.price);
    expect(productBody.title).toBe(productFromList.title);
    expect(productBody.stock).toBe(productFromList.stock);
    
    console.log(`Product ${i}: ID=${productId}, Price=${productBody.price}, Title=${productBody.title}, Stock=${productBody.stock}`);
  }
});

test('api get login - verify authentication tokens', async ({ request }) => {
  // Setup: Authenticate with test credentials
  const authUrl = process.env.DUMMYJSON_AUTH_URL || 'https://dummyjson.com/auth/login';
  const response = await request.post(authUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: testData.credentials.username,
      password: testData.credentials.password,
      expiresInMins: 30,
    },
  });
  
  // Assert: Verify authentication succeeded
  expect(response.status()).toBe(200);
  
  const body = await response.json();
  
  // Assert: Verify response contains required tokens and user info
  expect(body.username).toBe(testData.credentials.username);
  expect(body.accessToken).toBeDefined();
  expect(body.refreshToken).toBeDefined();
  expect(body.accessToken.length).toBeGreaterThan(0);
  expect(body.refreshToken.length).toBeGreaterThan(0);
  
  console.log(`Auth successful for user: ${body.username}`);
  console.log(`Access Token: ${body.accessToken.substring(0, 20)}...`);
  console.log(`Refresh Token: ${body.refreshToken.substring(0, 20)}...`);
});