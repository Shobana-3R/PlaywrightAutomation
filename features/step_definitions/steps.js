const { When, Then, Given } = require('@cucumber/cucumber')
const {POManager} = require('../../POM/POManager')
const {expect} = require('@playwright/test')
const playwright = require('@playwright/test')

Given('a login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    this.poManager = new POManager(page)
    const loginPage = this.poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(username,password)
});
When('an item {string} is added to cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
      this.dashboardPage = this.poManager.getDashboardPage()
    await this.dashboardPage.searchProductAddCart(productName)
    await this.dashboardPage.navigateToCart()

});
Then('verify the item {string} is displayed in the cart page successfully', async function (productName) {

    const cartPage = this.poManager.getCartPage();

    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

});
When('Enter valid details in cart page and place order', async function () {
  // Write code here that turns the phrase above into concrete actions
const ordersReviewPage = this.poManager.getOrdersReviewPage()
await ordersReviewPage.searchCountryAndSelect("ind", "India")
this.orderId = await ordersReviewPage.SubmitAndGetOrderId()
console.log(this.orderId)
});

Then('verify order is present in the order history page', async function () {
  // Write code here that turns the phrase above into concrete actions
await this.dashboardPage.navigateToOrders()
const ordersHistoryPage = this.poManager.getOrdersHistoryPage()
await ordersHistoryPage.searchOrderAndSelect(this.orderId)
expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy()
});
