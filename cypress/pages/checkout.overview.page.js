import { BasePage } from "./base.page";
import { itemCard } from "./elements/item.card.element";

const itemTotalLabel = '[data-test="subtotal-label"]';
const taxTotalLabel = '[data-test="tax-label"]';
const totalPriceLabel = '[data-test="total-label"]';
const finishBtn = '[data-test="finish"]';

class OverviewPage extends BasePage {
  get itemTotalLabel() {
    return cy.get(itemTotalLabel);
  }

  get taxTotalLabel() {
    return cy.get(taxTotalLabel);
  }

  get totalPriceLabel() {
    return cy.get(totalPriceLabel);
  }

  get finishBtn() {
    return cy.get(finishBtn);
  }

  get itemCard() {
    return itemCard;
  }
}

const overviewPage = new OverviewPage();

export {
  OverviewPage,
  overviewPage,
}
