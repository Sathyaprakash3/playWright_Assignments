import test, { expect } from "@playwright/test";

test('api sample', async({request}) => {
    const response = await request.get(process.env.DUMMYJSON_PRODUCTS_URL || 'https://dummyjson.com/products');
    const body = await response.json();
    //console.log("New code added");
    //console.log(body);
    //Download products and print the price of the first 5 products and validate the price, title and stock with the response of the product id api
    console.log(body.products[0].id);
    for(let i = 1;i<=5;i++){
    
            const responseForID = await request.get(`${process.env.DUMMYJSON_PRODUCTS_URL || 'https://dummyjson.com/products'}/${body.products[i].id}`);
            const productBody = await responseForID.json();
            const thirdproductPrice = productBody.price;
            //console.log(thirdproductPrice);
            const thirdproductTitle = productBody.title;
            //console.log(thirdproductTitle);
            const thirdproductstock = productBody.stock;
            console.log(thirdproductstock);

            console.log(productBody.price);
            expect(productBody.price).toBe(thirdproductPrice);
            expect(productBody.title).toBe(thirdproductTitle);
            expect(productBody.stock).toBe(thirdproductstock);
        }
    /* let productid = body.products[1].id;
    const responseForID = await request.get(`https://dummyjson.com/products/${productid}`);
    const productBody = await responseForID.json();
    const price = 19.99
    console.log(productBody.price);
    expect(await productBody.price).toBe(price); */
})

test('api get login', async({request}) => {
     const response = await request.post(
        process.env.DUMMYJSON_AUTH_URL || 'https://dummyjson.com/auth/login',
        {
            headers: {
                'Content-Type': 'application/json'
            },

            data: {
                username: 'emilys',
                password: 'emilyspass',
                expiresInMins: 30
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    console.log(body.accessToken);
    console.log(body.refreshToken);

    expect(body.username).toBe('emilys');
    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();


})