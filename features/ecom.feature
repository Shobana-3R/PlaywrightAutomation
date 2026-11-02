Feature: Ecommerce Validations

  Scenario: Placing the order
    Given a login to Ecommerce application with "shobana3@gmail.com" and "Test@123"
    When an item "ZARA COAT 3" is added to cart
    Then verify the item "ZARA COAT 3" is displayed in the cart page successfully
    When Enter valid details in cart page and place order
    Then verify order is present in the order history page