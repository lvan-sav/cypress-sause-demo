import { yourInfoPage } from "../pages/checkout.your.info.page";
import { itemCard } from "../pages/elements/item.card.element";
import { loginPage } from "../pages/login.page";

Cypress.Commands.add('login', (username, password) => {
  loginPage.goto();
  loginPage.loginField.type(username);
  loginPage.passwordField.type(password);
  loginPage.loginBtn.click();
});

Cypress.Commands.add('addItemToCart', (itemTitleToAdd, aliasName) => {
  itemCard.inventoryCard
    .then($items => {
      let itemPrice;
      let index;
      let itemTitle
      const itemsArray = $items.toArray();
      for (let itemIndex = 0; itemIndex < itemsArray.length; itemIndex++) {
        const item = itemsArray[itemIndex];
        itemTitle = item.querySelector(itemCard.itemInventoryNameSelector).textContent;
        if (itemTitle === itemTitleToAdd) {
          itemPrice = item.querySelector(itemCard.itemInventoryPriceSelector).textContent;
          itemPrice = itemPrice.replace("$", "")
          index = itemIndex;
          break;
        }
      }
      cy.wrap({
        itemTitle: itemTitle,
        itemPrice: itemPrice,
        index: index,
      }).as(aliasName)
    });
    
  cy.get(`@${aliasName}`)
    .then(itemInfo => {
      itemCard.inventoryCard
        .eq(itemInfo.index)
        .within(() => {
          itemCard.addToCartBtn.click();
        });
    });
});

Cypress.Commands.add("removeItemFromCart", (itemTitle) => {
  itemCard.inventoryCard
    .filter(`:contains(${itemTitle})`)
    .within(() => {
      itemCard.removeItemFromCart.click();
    });
})

Cypress.Commands.add("processCheckoutYourInfoPage", (firstName, lastName, postalCode) => {
  yourInfoPage.firstNameField.type(firstName);
  yourInfoPage.lastNameField.type(lastName);
  yourInfoPage.zipCodeField.type(postalCode);
  
  yourInfoPage.continueBtn.click();
})
