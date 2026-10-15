const {test, expect} = require('@playwright/test')

//Invalid Login
test ('Browser Context Playwright Test', async ({page}) =>
{
page.route('**/*.css', route => route.abort()) //network interception to block css
    await page.goto("https://rahulshettyacademy.com/loginpagePractise")
console.log(await page.title());

//css - selectors to identify elements uniquely on the web pages
await page.locator('#username').fill("Shobana"); //type (deprecated) or fill -> same purpose to input
await page.locator("[type='password']").fill("Learning");
await page.locator('#signInBtn').click();
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incorrect');

});

//valid Login
test ('Login Playwright Test', async ({page}) =>
{
page.route('**/*.{jpg,png,jpeg}', route => route.abort()) //network interception to block images
const userName = page.locator('#username')
const passWord = page.locator('#password')
const signIn = page.locator('#signInBtn')
const cardTitles = page.locator(".card-body a")
page.on('request',request => console.log(request.url())) //listens and gives all the request urls
page.on('response',response => console.log(response.url(), response.status()))
await page.goto("https://rahulshettyacademy.com/loginpagePractise")
console.log(await page.title())

    //css - selectors to identify elements uniquely on the web pages
await userName.fill("Shobana"); //type (deprecated) or fill -> same purpose to input
await passWord.fill("Learning@830$3mK2")
await signIn.click()
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incorrect')
//wipe the existing credentials
await userName.fill("")
await userName.fill("rahulshettyacademy")
await signIn.click()
console.log(await cardTitles.first().textContent())
console.log(await cardTitles.nth(1).textContent())
const allTitles = cardTitles.allTextContents()
console.log(await allTitles)
})


//Empty Credentials
test ('Empty Cred Playwright Test', async ({page}) =>
{
const signIn = page.locator('#signInBtn')
await page.goto("https://rahulshettyacademy.com/loginpagePractise")
console.log(await page.title());
await signIn.click();
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Empty');
});

//Logout
test ('Logout Playwright Test', async ({page}) =>
{
const userName = page.locator('#user-name')
const passWord = page.locator('#password')
const signIn = page.locator('#login-button')
await page.goto("https://www.saucedemo.com/")
console.log(await page.title());
await userName.fill("standard_user");
await passWord.fill("secret_sauce");
await signIn.click();
console.log(await page.locator('span.title').textContent())
await expect(page.locator('span.title')).toContainText('Products')
await page.locator('#react-burger-menu-btn').click()
await page.locator('#logout_sidebar_link').click()
console.log(await page.title());
await expect(signIn).toHaveText('Login');
});

//Sample Google test
test ('Page Playwright Test', async ({page}) => //.only runs only this test and skips the rest
{
await page.goto("https://google.com");
//get title assertion
console.log(await page.title());
await expect(page).toHaveTitle("Google");
})

//UI Controls
test ('UI Controls Test', async ({page}) => //.only runs only this test and skips the rest
{
const userName = page.locator('#username')
const passWord = page.locator('#password')
const signIn = page.locator('#signInBtn')
const dropDown = page.locator('select.form-control')
const docLink = page.locator("[href*='documents-request']")
const okpopButton = page.locator('#okayBtn');

await page.goto("https://rahulshettyacademy.com/loginpagePractise")
await userName.fill("rahulshettyacademy")
await passWord.fill("Learning@830$3mK2")
await dropDown.click()
await dropDown.selectOption("Consultant")
await page.locator('span.checkmark').last().click()
await okpopButton.waitFor({ state: 'visible' });
await okpopButton.click()
console.log(await page.locator('span.checkmark').last().isChecked())
await expect(page.locator('span.checkmark').last()).toBeChecked() //Radio button assertion
await page.locator('//*[@id="terms"]').click()
await expect(page.locator('//*[@id="terms"]')).toBeChecked() //Checkbox assertion
await page.locator('//*[@id="terms"]').uncheck()
expect(await page.locator('//*[@id="terms"]').isChecked()).toBeFalsy() //uncheck assertion
await expect(docLink).toHaveAttribute("class","blinkingText")
await signIn.click()
console.log("URL after Sign In:", page.url());

});

test('Child window handling', async ({ page, context }) => {

    const docLink = page.locator("[href*='documents-request']");

    await page.goto(
        "https://rahulshettyacademy.com/loginpagePractise"
    );

    const newPagePromise = context.waitForEvent('page');

    await docLink.click();

    const newPage = await newPagePromise;

    console.log("New tab URL:", newPage.url());
});