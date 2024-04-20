import { allItemsPage } from "../pages/all.items.page";
import { overviewPage } from "../pages/checkout.overview.page";
import { completePage } from "../pages/checkout.complate.page";
import { loginPage } from "../pages/login.page";
import { cartPage } from "../pages/cart.page";
import helper from "../support/helper";

describe("Verify logout flow", () => {
  beforeEach(() => {
    cy.fixture("users")
      .its("standard_user")
      .then(credentials => {
        cy.login(credentials.username, credentials.password);
      });
    cy.fixture("testItems").its("backpack.name").as("backpackName");
  });
  
  it("Should logout after checkout processed", function () {
    cy.addItemToCart(this.backpackName, "firstItemInfo");

    allItemsPage.headerCartBtn.click();

    cartPage.checkoutBtn.click();
    
    const firstName = helper.randomStr();
    const lastName = helper.randomStr();
    const zipCode = helper.randomNumber(5);

    cy.processCheckoutYourInfoPage(firstName, lastName, zipCode);

    overviewPage.finishBtn.click();
    
    completePage.backHomeBtn.click();

    allItemsPage.burgerMenuBtn.click();
    allItemsPage.logoutSidebarLink.click();

    loginPage.loginField.should('have.value', "");
    loginPage.passwordField.should('have.value', "");
    loginPage.loginBtn.should('be.visible');
  });
});
