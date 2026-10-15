const {LoginPage} = require('./LoginPage')
const {DashboardPage} = require('./DashboardPage')
const {OrdersHistoryPage} = require('./OrdersHistoryPage')
const {OrdersReviewPage} = require('./OrdersReviewPage')
const {CartPage} = require('./CartPage')
class POManager 
{
    constructor(page)
    {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.dashboardPage = new DashboardPage(page)
        this.cartPage = new CartPage(page)
        this.ordersReviewPage = new OrdersReviewPage(page)
        this.ordersHistoryPage = new OrdersHistoryPage(page)
    }

    getLoginPage()
    {
        return this.loginPage
    }

    getDashboardPage()
    {
        return this.dashboardPage
    }

    getCartPage()
    {
        return this.cartPage
    }

    getOrdersHistoryPage()
    {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage()
    {
        return this.ordersReviewPage;
    }
}
module.exports = {POManager}