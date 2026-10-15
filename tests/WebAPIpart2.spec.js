//Login Once in UI -> .json
// test browser -> .json, cart-order, order history, order summary

const {test, expect} = require('@playwright/test')
let webContext
test.beforeAll(async({browser}) => 
{ 
    const context = await browser.newContext()
    const page = await context.newPage()
await page.goto("https://rahulshettyacademy.com/client")
await page.locator("#userEmail").fill("shobana3@gmail.com")
await page.locator("#userPassword").fill("Test@123")
await page.locator("[value='Login']").click()
// await page.waitForLoadState('networkidle') //DISCOURAGED wait until there are no network connections for at least 500 ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
await page.locator(".card-body b").first().waitFor()
await context.storageState({path: 'state.json'})
webContext = await browser.newContext({storageState: 'state.json'})
})

//valid Login
test.skip ('Login after Storage', async () =>
{
const page = await webContext.newPage()
await page.goto("https://rahulshettyacademy.com/client")

const titles = await page.locator(".card-body b").allTextContents()
console.log(titles)
});

