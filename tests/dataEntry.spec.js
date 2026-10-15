const {test, expect} = require('@playwright/test')

//Alerts & Dialogs
test ('data Entry - Alerts', async ({page}) =>
{
await page.goto("https://testautomationpractice.blogspot.com/")
page.once('dialog',dialog => dialog.accept())
await page.locator('#confirmBtn').click() //Accept alert
await expect(page.locator('#demo')).toContainText('You pressed OK!');

page.once('dialog',dialog => dialog.dismiss())
await page.locator('#confirmBtn').click() //Decline alert
await expect(page.locator('#demo')).toContainText('You pressed Cancel!');

page.once('dialog', async dialog => {
expect(dialog.message()).toBe('I am an alert box!')
await dialog.accept();
})
await page.locator('#alertBtn').click() //Validate text inside popup

page.once('dialog', async dialog => {
    await dialog.accept('Severus Snape');
});

await page.locator('#promptBtn').click();
await expect(page.locator('#demo')).toContainText('Hello Severus Snape! How are you today?');
})


test ('Calendar demo', async ({page}) =>
{
await page.goto("https://demoqa.com/date-picker")
let date = "09/20/2026"
await page.fill('#datePickerMonthYearInput', date)
console.log(await page.locator('#datePickerMonthYearInput').textContent())

})

test ('Calendar demo1', async ({page}) =>
{
console.log("URL after Sign In:", page.url())
await page.goto("https://demoqa.com/date-picker")
await page.click('#datePickerMonthYearInput')
await page.locator('select.react-datepicker__month-select').selectOption('0')
await page.locator('select.react-datepicker__year-select').selectOption({label: '2000'})
await page.locator('.react-datepicker__month')
await page.locator('.react-datepicker__day--010:not(.react-datepicker__day--outside-month)').click();
})

test ('File Upload', async ({ page }) => {
await page.goto("https://testautomationpractice.blogspot.com/")
const fileInput = page.locator('#singleFileInput')
await fileInput.setInputFiles('C:\\Users\\shobana.rajesh\\OneDrive - psiog.com\\Documents\\week3_notes.txt');
await page.getByRole('button', { name: 'Upload Single File' }).click();
await expect(page.locator('#singleFileStatus')).toContainText('week3_notes.txt');
});


// Enabled Disabled Test with Soft, Hard and Multiple assertions
test ('Soft assertions', async ({ page }) => {
await page.goto("https://practicetestautomation.com/practice-test-exceptions/")
await expect.soft (page.locator('.input-field')).toBeDisabled()
await page.getByRole('button', {name: 'Edit'}).click()
await expect.soft (page.locator('.input-field')).toBeEnabled()
await page.locator ('.input-field').fill("Noodles")
await page.getByRole('button', {name: 'Save'}).click()
await expect.soft (page.locator('.input-field')).toBeDisabled()
await page.getByRole('button', {name: 'Add'}).click()
await expect(page.getByText("Row 2 was added")).toBeVisible()
await page.locator ('#row2 input.input-field').fill("12345")
await page.getByRole('button', {name: 'Save'}).click()
await expect(page.getByText("Row 2 was saved")).toBeVisible()
await expect.soft (page.locator ('#row2 input.input-field')).toHaveValue("12345")
})