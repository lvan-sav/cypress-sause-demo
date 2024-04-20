const inventoryCard = '[data-test="inventory-item"]';
const itemInventoryName = '[data-test="inventory-item-name"]';
const itemInventoryPrice = '[data-test="inventory-item-price"]';
const itemInventoryQty = '[data-test="item-quantity"]';
const addItemToCart = '[data-test^="add-to-cart"]';
const removeItemFromCart = '[data-test^="remove"]';

class ItemCard {
  constructor() {
    this.itemInventoryNameSelector = itemInventoryName;
    this.itemInventoryPriceSelector = itemInventoryPrice;
  }

  get inventoryCard() {
    return cy.get(inventoryCard);
  }

  get itemName() {
    return cy.get(itemInventoryName);
  }

  get itemPrice() {
    return cy.get(itemInventoryPrice);
  }

  get itemQty() {
    return cy.get(itemInventoryQty);
  }

  get addToCartBtn() {
    return cy.get(addItemToCart);
  }

  get removeItemFromCart() {
    return cy.get(removeItemFromCart);
  }
};

const itemCard = new ItemCard();

export {
  ItemCard,
  itemCard,
}
