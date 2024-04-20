import { BasePage } from "./base.page";

const resultImg = '[data-test="pony-express"]';
const completeHeader = '[data-test="complete-header"]';
const completeText = '[data-test="complete-text"]';
const backHomeBtn = '[data-test="back-to-products"]';

class CompletePage extends BasePage {
  get resultImg() {
    return cy.get(resultImg);
  }

  get complateHeader() {
    return cy.get(completeHeader);
  }

  get completeText() {
    return cy.get(completeText);
  }

  get backHomeBtn() {
    return cy.get(backHomeBtn);
  }
}

const completePage = new CompletePage();

export {
  CompletePage,
  completePage,
}
