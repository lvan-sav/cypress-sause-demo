import helper from "../support/helper";
import { allItemsPage } from "../pages/all.items.page";
import { cartPage } from "../pages/cart.page";
import { overviewPage } from "../pages/checkout.overview.page";
import { yourInfoPage } from "../pages/checkout.your.info.page";
import { completePage } from "../pages/checkout.complate.page";

describe('Verify checkout process', () => {
  beforeEach(() => {
    cy.fixture("users")
      .its("standard_user")
      .as("standart_user");
    cy.get("@standart_user").then(credentials => {
      cy.login(credentials.username, credentials.password);
    });
    cy.fixture("testItems").its("backpack.name").as("backpackName");
    cy.fixture("testItems").its("bike.name").as("bikeName");
  });

  it("Should contain added two items on the Checkout page", function () {
    cy.addItemToCart(this.backpackName, "firstItemInfo");
    cy.addItemToCart(this.bikeName, "secondItemInfo");
    allItemsPage.headerCartItemsAmount
      .should("have.text", "2");
    allItemsPage.headerCartBtn.click();

    cartPage.itemCard.inventoryCard
      .should("have.length", 2);
    
    cartPage.checkoutBtn.click();

    yourInfoPage.pageTitleLabel
      .should("have.text", "Checkout: Your Information");
    
    const firstName = helper.randomStr();
    const lastName = helper.randomStr();
    const zipCode = helper.randomNumber(5);

    cy.processCheckoutYourInfoPage(firstName, lastName, zipCode);
    
    overviewPage.itemCard.inventoryCard
      .should("have.length", 2);

    cy.get("@firstItemInfo")
      .verifyCartItem(0);
    
    cy.get("@secondItemInfo")
      .verifyCartItem(1);
  });

  it("Should be pref-filled on the Checkout: Your information page", () => {
    allItemsPage.headerCartBtn.click();
    cartPage.checkoutBtn.click();

    yourInfoPage.firstNameField
      .invoke("val")
      .should("not.be.null")
      .and("not.equal", "");
    yourInfoPage.lastNameField
      .invoke("val")
      .should("not.be.null")
      .and("not.equal", "");
    yourInfoPage.zipCodeField
      .invoke("val")
      .should("not.be.null")
      .and("not.equal", "");

    cy.fixture("users")
      .its("standard_user")
      .then(userData => {
        yourInfoPage.firstNameField.should("contain.value", userData.firstName);
        yourInfoPage.lastNameField.should("contain.value", userData.lastName);
        yourInfoPage.zipCodeField.should("contain.value", userData.zipCode);
      });
  });

  it("Should display added items and total price displayed", function () {
    cy.addItemToCart(this.backpackName, "firstItemInfo");

    allItemsPage.headerCartItemsAmount
      .should("have.text", "1");
    allItemsPage.headerCartBtn.click();

    cartPage.itemCard.inventoryCard
      .should("have.length", 1);
    
    cartPage.checkoutBtn.click();

    yourInfoPage.pageTitleLabel
      .should("have.text", "Checkout: Your Information");
    
    const firstName = helper.randomStr();
    const lastName = helper.randomStr();
    const zipCode = helper.randomNumber(5);

    cy.processCheckoutYourInfoPage(firstName, lastName, zipCode);
    
    overviewPage.itemCard.inventoryCard
      .should("have.length", 1);

    cy.get("@firstItemInfo")
      .verifyCartItem(0);
    
    overviewPage.itemTotalLabel.should("be.visible");
    overviewPage.taxTotalLabel.should("be.visible");
    overviewPage.totalPriceLabel.should("be.visible");
  });

  it("Should have correct prices according to the added items on the Checkout: Overview page", function () {
    cy.addItemToCart(this.backpackName, "firstItemInfo");
    cy.addItemToCart(this.bikeName, "secondItemInfo");

    allItemsPage.headerCartBtn.click();
    cartPage.checkoutBtn.click();
    
    const firstName = helper.randomStr();
    const lastName = helper.randomStr();
    const zipCode = helper.randomNumber(5);

    cy.processCheckoutYourInfoPage(firstName, lastName, zipCode);
    
    cy.get("@firstItemInfo").then(firstItemInfo => {
      cy.get("@secondItemInfo").then(secondItemInfo => {
        const itemsPriceSum = parseFloat(firstItemInfo.itemPrice) + parseFloat(secondItemInfo.itemPrice);
        
        overviewPage.itemTotalLabel
          .invoke("text")
          .then(text => {
            const itemsTotalPrice = parseFloat(text.split("$")[1]);
            cy.wrap(itemsTotalPrice).should("equal", itemsPriceSum);
          });
        
        overviewPage.taxTotalLabel
          .invoke("text")
          .then(taxText => {
            const orderTax = parseFloat(taxText.split("$")[1]);
            overviewPage.totalPriceLabel
              .invoke("text")
              .then(totalPriceText => {
                const totalPrice = parseFloat(totalPriceText.split("$")[1]);
                cy.wrap(totalPrice).should("equal", orderTax + itemsPriceSum);
              });
          })
      });
    });
  });

  it("Should open Success checkout page aftrer checkout process", function () {
    cy.addItemToCart(this.backpackName, "firstItemInfo");

    allItemsPage.headerCartBtn.click();

    
    cartPage.checkoutBtn.click();
    
    const firstName = helper.randomStr();
    const lastName = helper.randomStr();
    const zipCode = helper.randomNumber(5);

    cy.processCheckoutYourInfoPage(firstName, lastName, zipCode);

    overviewPage.finishBtn.click();

    completePage.pageTitleLabel
      .should("have.text", "Checkout: Complete!");
    
    completePage.resultImg
      .should("be.visible");
    
    completePage.complateHeader
      .should("be.visible")
      .and("have.text", "Thank you for your order!");
    
    completePage.completeText
      .should("be.visible")
      .and("have.text", "Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    
    completePage.backHomeBtn
      .should("be.visible");
  });
});
