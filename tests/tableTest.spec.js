const { test, expect } = require('@playwright/test');

test("Handle Web Table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table = await page.locator('//*[@id="HTML1"]/div[1]/table')

    // get total number of rows and cols
    const cols = table.locator('tbody tr').first().locator('th');
    console.log("number of cols", await cols.count());

    const rows = await table.locator("tbody tr");
    console.log("number of rows", await rows.count());

    //1.assertion - find count
    expect(await rows.count()).toBe(7);
    expect(await cols.count()).toBe(4);

    //2. assertion - find specific row
    const learnJSRow = rows.filter({ hasText: 'Learn JS' });
    console.log("Matching rows:", await learnJSRow.count());

    //3. assertion - click an action inside row
    const pageTable = await page.locator('#productTable')
    const tRows = pageTable.locator('tbody tr')
    const matchedRow = tRows.filter({hasText: 'Smartwatch'}) 
    console.log("Matched Row:", await matchedRow.count())
    await matchedRow.locator('input[type="checkbox"]').check()

})

    //4. Using Pagination
test("Pagination", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table = await page.locator("#productTable");
    const rows = await table.locator("tbody tr");
    const PaginationSelector = await page.locator("#pagination li a");
    console.log("Number of pagination: ", await PaginationSelector.count());
    for (let p = 0; p < await PaginationSelector.count(); p++) {
        if (p > 0) {    // as we are on pagination 1 whose index is 0 so we add this 
            await PaginationSelector.nth(p).click();

        }
        for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);
            const tds = row.locator("td");  //capture the td of first row which is 0th index here and here we get 4 tds
            console.log(await tds.count());
            for (let j = 0; j < await tds.count() - 1; j++) {
                console.log("column data", await tds.nth(j).textContent());

            }
        }
    }
})

//5. Sort and filter
test ("Pagination - Sort and Filter Products", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const pageTable = page.locator('#productTable'); // Locate the pagination table
    const rows = pageTable.locator('tbody tr'); // Locate all rows
    const paginationSelector = page.locator("#pagination li a"); // Locate pagination links
    const paginationCount = await paginationSelector.count();
    console.log("Number of pagination pages:", paginationCount);
    const products = [];

    // Loop through all pagination pages       // Page 1 is already displayed 
    for (let p = 0; p < paginationCount; p++) {
            if (p > 0) 
                {
                    await paginationSelector.nth(p).click(); // Click pages 2, 3, 4...
                }
    const rowCount = await rows.count(); // Get number of rows on current page
    for (let i = 0; i < rowCount; i++) 
                { // Loop through rows on current page
            const row = rows.nth(i);
            const tds = row.locator("td");
            const productName = await tds.nth(1).textContent(); // Get product name
            const priceText = await tds.nth(2).textContent(); // Get price
            const price = parseFloat(priceText.replace("$", "")); // Remove $ and convert string to number
            products.push({  // Store product details
                name: productName.trim(),
                price: price
            });
        }
    }
// SORT: Lowest price to highest price
    products.sort((a, b) => a.price - b.price);
    console.log("\n===== PRODUCTS SORTED BY PRICE =====");
    for (const product of products) {console.log(`${product.name} - $${product.price.toFixed(2)}`)}
// FILTER: Products greater than $10
    const productsAbove10 = products.filter(product => product.price > 10)
    console.log("\n===== PRODUCTS GREATER THAN $10 =====");
    for (const product of productsAbove10) {console.log(`${product.name} - $${product.price.toFixed(2)}`);
}
});

//Dynamic table values
test.skip ("Dynamic Table Values", async ({ page }) => {
await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html")
const table = page.locator('#taskTable')
const rows = table.locator('tbody tr')
const chromeRow = rows.filter({ hasText: 'Chrome' })
const cells = chromeRow.locator('td');
console.log("Number of Rows:", await rows.count())
console.log("Chrome rows:", await chromeRow.count()) //chrome row count = 1
console.log("Chrome CPU:", await cells.nth(1).textContent()); // CPU dynamic value
})
