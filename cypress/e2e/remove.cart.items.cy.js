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

  it("Should remove one item from cart with two items on Cart page", function () {
    const firstItemName = this.backpackName;
    const secondItemName = this.bikeName;

    cy.addItemToCart(firstItemName, "firstItemInfo");
    cy.addItemToCart(secondItemName, "secondItemInfo");

    allItemsPage.headerCartItemsAmount
      .should("have.text", "2");
    
    allItemsPage.headerCartBtn.click();

    cy.removeItemFromCart(firstItemName);

    cartPage.headerCartItemsAmount
      .should("have.text", "1");
    
    cartPage.itemCard.inventoryCard
      .should("have.length", 1);
    
    cartPage.itemCard.inventoryCard
      .filter(`:contains(${firstItemName})`)
      .should("not.exist");
    
    cy.get("@secondItemInfo").verifyCartItem(0);
  });

  it("Should remove one item from cart with one item on All items page", function () {
    const testItemName = this.backpackName;
    cy.addItemToCart(testItemName, "firstItemInfo");
    
    allItemsPage.headerCartItemsAmount
      .should("have.text", "1");
      
    allItemsPage.headerCartBtn.click();

    cartPage.itemCard.inventoryCard
      .should("have.length", 1);
    
    cy.go('back');

    cy.removeItemFromCart(testItemName);
    
    allItemsPage.headerCartItemsAmount
      .should("not.exist");
    
    allItemsPage.headerCartBtn.click();

    cartPage.itemCard.inventoryCard.should("not.exist");
  });
});
