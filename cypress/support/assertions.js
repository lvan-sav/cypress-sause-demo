import { itemCard } from "../pages/elements/item.card.element";

Cypress.Commands.add("verifyCartItem", { prevSubject: "optional" }, (subject, cartIndex) => {
    cy.wrap(subject)
      .should("have.a.property", "itemTitle");
    
    cy.wrap(subject)
      .and("have.a.property", "itemPrice");
    
    cy.wrap(cartIndex)
      .should("not.be.null");
    
    itemCard.itemName
      .eq(cartIndex)
      .should('have.text', subject.itemTitle);
    itemCard.itemPrice
      .eq(cartIndex)
      .should('contain.text', subject.itemPrice);
    itemCard.itemQty
      .eq(cartIndex)
      .should("have.text", "1");
});
