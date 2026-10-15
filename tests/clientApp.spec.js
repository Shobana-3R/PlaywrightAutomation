const {test, expect} = require('@playwright/test')
//test.describe.configure({mode: 'parallel'})
test.describe.configure({mode: 'serial'}) //remaining executions will be skipped if 1 test fails incase of interdependent tests
//valid Login
test ('Example', async ({page}) =>
{
await page.goto("https://rahulshettyacademy.com/client")
await page.locator("#userEmail").fill("shobana3@gmail.com")
await page.locator("#userPassword").fill("Test@123")
await page.locator("[value='Login']").click()
// await page.waitForLoadState('networkidle') //DISCOURAGED wait until there are no network connections for at least 500 ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
await page.locator(".card-body b").first().waitFor()
const titles = await page.locator(".card-body b").allTextContents()
console.log(titles)
});


test ('More validations', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    //await page.goto("https://google.com")
    //await page.goBack()
    //await page.goForward()
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    page.on('dialog', dialog => dialog.accept())
    await page.locator("#confirmbtn").click()
    await page.locator("#mousehover").hover()
    const framespage = page.frameLocator('#courses-iframe')
    await framespage.locator("li a[href*='lifetime-access']:visible").click()
    const textCheck = await framespage.locator(".text h2").textContent()
    console.log(textCheck.split(" ")[1])
})

test('screenshot & visual comparison', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator('#displayed-text').screenshot({path: 'partialscreenshot.png'})
    await page.locator("#hide-textbox").click()
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden()

})

test.skip ('visual', async({page}) =>
{
await page.goto("https://flightaware.com/")
expect(await page.screenshot()).toMatchSnapshot('landing.png')

})
