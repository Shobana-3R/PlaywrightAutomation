const {test, expect, request} = require('@playwright/test')
const {APIUtils} = require('../utils/APIUtils')
const loginPayload = {userEmail: "shobana3@gmail.com", userPassword: "Test@123"}
const orderPayload = {orders:[{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const fakePayloadOrders = {data: [], message: "No Orders"}
let response
test.beforeAll( async () =>
{

const apiContext = await request.newContext()
const apiUtils = new APIUtils(apiContext,loginPayload)
response = await apiUtils.createOrder(orderPayload)
})

// create order is success
test ('intercepting response', async ({page}) =>
{

    await page.addInitScript(value  => {

    window.localStorage.setItem('token', value)
   }, response.token)
await page.goto("https://rahulshettyacademy.com/client")
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(fakePayloadOrders)
        route.fulfill(
        {
            response,
            body,
        })
        //intercepting response - API response ->|| ->{playwright fake response} -> browser -> render data on front end
    }
)

await page.locator("button[routerlink*='myorders']").click()
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
console.log(await page.locator (".mt-4").textContent())



});
