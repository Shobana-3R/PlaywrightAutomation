const ExcelJs = require('exceljs')
const {test,expect} = require('@playwright/test')

async function writeExcelTest(searchText, replaceText,change, filePath) {
    
    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = readExcel(worksheet, searchText, change)
const cell = worksheet.getCell(output.row, output.column+change.colChange)
cell.value = replaceText
    await workbook.xlsx.writeFile(filePath)
}

function readExcel(worksheet, searchText) {
    let output = {row:-1,column:-1};    
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = {row: rowNumber, column: colNumber}
            }
        })
    })
    return output
}
//writeExcelTest("Mango", "350", {rowChange:0,colChange:2}, "/Users/shobana.rajesh/OneDrive - psiog.com/excelpractice.xlsx")

test('upload download excel validation', async ({page}) =>
{
    const textSearch = 'Mango'
    const updateValue = '350'
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', {name: 'Download'}).click()
    await downloadPromise
    writeExcelTest(textSearch, updateValue, {rowChange:0,colChange:2}, "/Users/shobana.rajesh/Downloads/download.xlsx")
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles("/Users/shobana.rajesh/Downloads/download.xlsx")
    const desiredRow = await page.getByRole('row').filter({has: page.getByText(textSearch)})
    //assertion
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue)
})