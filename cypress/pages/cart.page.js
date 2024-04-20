import { BasePage } from "./base.page";
import { itemCard } from "./elements/item.card.element";

const checkoutBtn = '[data-test="checkout"]';

class CartPage extends BasePage {
  get checkoutBtn() {
    return cy.get(checkoutBtn);
  }
  
  get itemCard() {
    return itemCard;
  }
}

const cartPage = new CartPage();

export {
  CartPage,
  cartPage,
}
