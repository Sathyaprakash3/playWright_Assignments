import test, { expect } from "@playwright/test";

test('api sample', async({request}) => {
    const response = await request.get('https://dummyjson.com/products');
    const body = await response.json();
    //console.log(body);
    console.log(body.products[0].id);
    for(let i = 1;i<=5;i++){
    
            const responseForID = await request.get(`https://dummyjson.com/products/${body.products[i].id}`);
            const productBody = await responseForID.json();
            const thirdproductPrice = productBody.price;
            console.log(thirdproductPrice);
            const thirdproductTitle = productBody.title;
            console.log(thirdproductTitle);
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