const { BasePage } = require("./base.page");

const firstNameField = '[data-test="firstName"]';
const lastNameField = '[data-test="lastName"]';
const zipCodeField = '[data-test="postalCode"]';
const continueBtn = '[data-test="continue"]';

class YourInfoPage extends BasePage {
  get firstNameField() {
    return cy.get(firstNameField);
  }

  get lastNameField() {
    return cy.get(lastNameField);
  }

  get zipCodeField() {
    return cy.get(zipCodeField);
  }

  get continueBtn() {
    return cy.get(continueBtn);
  }
};

const yourInfoPage = new YourInfoPage();

export {
  YourInfoPage,
  yourInfoPage
}
