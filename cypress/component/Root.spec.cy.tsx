import Root from "../../src/pages/Root";

describe("<Root />", () => {
  it("renders", () => {
    cy.mount(<Root />);

    cy.get("#cardName").should("exist").children().should("have.length", 2);
    cy.get("#cardNumber").should("exist").children().should("have.length", 2);
    cy.get("#cardCVV").should("exist").children().should("have.length", 2);
    cy.get("#cardMonth").should("exist").children().should("have.length", 2);
    cy.get("#cardYear").should("exist").children().should("have.length", 2);

    cy.get(".formCreditCardPreview")
      .should("exist")
      .children()
      .should("have.length", 5);

    cy.get("#submitButton").should("exist");
  });
});
