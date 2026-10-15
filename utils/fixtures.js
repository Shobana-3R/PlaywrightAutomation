const base = require('@playwright/test')
const { APIUtils } = require('./APIUtils.js')
const {request} = require('@playwright/test')
const loginPayload = {userEmail: "shobana3@gmail.com", userPassword: "Test@123"}
const orderPayload = {orders:[{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
exports.customtest = base.test.extend(
{
authenticatedPage: async({browser}, use) => {
const context = await browser.newContext()
const page = await context.newPage()
await page.goto("https://rahulshettyacademy.com/client")
await page.locator("#userEmail").fill("shobana3@gmail.com")
await page.locator("#userPassword").fill("Test@123")
await page.locator("[value='Login']").click()
await use(page)
//teardown
await context.close()
},

createOrder : async({},use) =>
    {
const apiContext = await request.newContext()
const apiUtils = new APIUtils(apiContext,loginPayload)
const response = await apiUtils.createOrder(orderPayload)
await use(response)
await apiContext.dispose() //teardown
    },

testDataForOrder : {
    productName : 'ADIDAS ORIGINAL'

}

}
)
