import { allItemsPage } from "../pages/all.items.page";
import { cartPage } from "../pages/cart.page";

describe('Verify items correctly added to the cart', () => {
  beforeEach(() => {
    cy.fixture("users")
      .its("standard_user")
      .then(credentials => {
        cy.login(credentials.username, credentials.password);
      });
    cy.fixture("testItems").its("backpack.name").as("backpackName");
    cy.fixture("testItems").its("bike.name").as("bikeName");
  });
  
  it("Should contains two added items on the Cart page", function () {
    cy.addItemToCart(this.backpackName, "firstItemInfo");
    cy.addItemToCart(this.bikeName, "secondItemInfo");
    allItemsPage.headerCartItemsAmount
      .should("have.text", "2");
    allItemsPage.headerCartBtn.click();

    cartPage.itemCard.inventoryCard
      .should("have.length", 2);
    
    cy.get("@firstItemInfo")
      .verifyCartItem(0);
    
    cy.get("@secondItemInfo")
      .verifyCartItem(1);
    
    cartPage.headerCartItemsAmount
      .should("have.text", "2");
  });
});
