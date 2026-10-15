const base = require('@playwright/test')

exports.customtest = base.test.extend(
    {
        testDataForOrder : {
            username : "shobana3@gmail.com",
            password : "Test@123",
            productName : "ZARA COAT 3"
        }
    }
)