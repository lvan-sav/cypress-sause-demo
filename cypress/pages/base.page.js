const headerCartBtn = '[data-test="shopping-cart-link"]';
const headerCartItemsAmount = '[data-test="shopping-cart-badge"]';
const pageTitleLabel = '[data-test="title"]';
const burgerMenuBtn = '#react-burger-menu-btn';
const allItemsSidebarLink = '[data-test="inventory-sidebar-link"]';
const logoutSidebarLink = '[data-test="logout-sidebar-link"]';

class BasePage {
  constructor() {}
  
  get headerCartBtn() {
    return cy.get(headerCartBtn);
  }

  get headerCartItemsAmount() {
    return cy.get(headerCartItemsAmount);
  }

  get pageTitleLabel() {
    return cy.get(pageTitleLabel);
  }

  get burgerMenuBtn() {
    return cy.get(burgerMenuBtn);
  }

  get allItemsSidebarLink() {
    return cy.get(allItemsSidebarLink);
  }

  get logoutSidebarLink() {
    return cy.get(logoutSidebarLink);
  }

  goto(link = "") {
    cy.visit(link);
  }
};

export {
  BasePage,
};
