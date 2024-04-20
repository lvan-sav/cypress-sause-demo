const { BasePage } = require("./base.page");

const loginField = '[data-test="username"]';
const passwordField = '[data-test="password"]';
const loginBtn = '[data-test="login-button"]';
const errorMsg = '[data-test="error"]';

class LoginPage extends BasePage {
  get loginField() {
    return cy.get(loginField);
  }

  get passwordField() {
    return cy.get(passwordField);
  }

  get loginBtn() {
    return cy.get(loginBtn);
  }

  get errorMsg() {
    return cy.get(errorMsg);
  }

  goto() {
    super.goto();
  }
};

const loginPage = new LoginPage();

export {
  LoginPage,
  loginPage,
};
