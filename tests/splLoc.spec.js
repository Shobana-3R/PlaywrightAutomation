import {test, expect} from '@playwright/test'
import { TIMEOUT } from 'node:dns'

test ('playwright special locators', async({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("abc123")
    await page.getByRole("button",{name: 'Submit'}).click()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
   // 5 seconds default timeout for expect assertions 5000 ms -- override steplevel to 10000 ms
    await expect (page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000})
    await page.getByRole("link",{name: 'Shop'}).click()
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click()


})

test ('playwright Test Level Timeout', async({page}) => {

    test.setTimeout(60000)
    //waitFor()
    const slowExpect = expect.configure({timeout : 9000})
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("abc123")
    await page.getByRole("button",{name: 'Submit'}).click()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
   // 5 seconds default timeout for expect assertions 5000 ms -- override steplevel to 10000 ms
    await slowExpect (page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000})
    await page.getByRole("link",{name: 'Shop'}).click()
    await slowExpect ( page.locator(".my-4").first()).toContainText("Shop")
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click()


})


test ('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "shobana3@gmail.com";
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Test@123");
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click(); //chained locators
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})