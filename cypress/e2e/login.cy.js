import { loginPage } from "../pages/login.page";
import helper from "../support/helper";

describe("Verify login process is valid", () => {
  beforeEach(() => {
    cy.fixture("users").its("standard_user").as("validUser");
  });

  it("Should open login page", () => {
    loginPage.goto();
    loginPage.loginField.should('have.value', "");
    loginPage.passwordField.should('have.value', "");
    loginPage.loginBtn.should('be.visible');
  });
  
  it("Should login user with valid credentials", () => {
    cy.get("@validUser").then(credentials => {
      cy.login(credentials.username, credentials.password);
      cy.url().should('not.be.a', Cypress.config().baseUrl);
    });
  });

  it("Should dispplay error after using invalid user credentials", () => {
    cy.get("@validUser").then(credentials => {
      const rndString = helper.randomStr();
      const invalidUsername = credentials.username + rndString;
      const invalidPassword = credentials.password + rndString;
      cy.login(invalidUsername, invalidPassword);
      cy.url().should('equal', Cypress.config().baseUrl);
      loginPage.errorMsg
        .should("be.visible")
        .and("have.text", "Epic sadface: Username and password do not match any user in this service")
    });
  });
})