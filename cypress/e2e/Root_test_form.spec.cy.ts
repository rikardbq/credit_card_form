describe("root credit card form", () => {
  it("fills card name input correctly", () => {
    cy.visit("/");

    cy.get("#cardName > input").type("Rikard Bergqvist");
    cy.get("#cardNameError").should("not.exist");
  });

  it("fills card number input correctly", () => {
    cy.visit("/");

    cy.get("#cardNumber > input").type("4485294467389141");
    cy.get("#cardNumberError").should("not.exist");
  });

  it("fills card cvv input correctly", () => {
    cy.visit("/");

    cy.get("#cardCVV > input").type("999");
    cy.get("#cardCVVError").should("not.exist");
  });

  it("fills card month correctly", () => {
    cy.visit("/");

    cy.get("#cardMonth > input").type("12");
    cy.get("#cardMonthError").should("not.exist");
  });

  it("fills card year correctly", () => {
    cy.visit("/");

    cy.get("#cardYear > input").type("32");
    cy.get("#cardYearError").should("not.exist");
  });

  it("fills card name input incorrectly trigger error", () => {
    cy.visit("/");

    cy.get("#cardName > input").type("Ri{backspace}");
    cy.get("#cardNameError").should("exist");
  });

  it("fills card number input incorrectly trigger error", () => {
    cy.visit("/");

    cy.get("#cardNumber > input").type("471");
    cy.get("#cardNumberError").should("exist");
  });

  it("fills card cvv input incorrectly trigger error", () => {
    cy.visit("/");

    cy.get("#cardCVV > input").type("99");
    cy.get("#cardCVVError").should("exist");
  });

  it("fills card month incorrectly trigger error", () => {
    cy.visit("/");

    cy.get("#cardMonth > input").type("1");
    cy.get("#cardMonthError").should("exist");
  });

  it("fills card year incorrectly trigger error", () => {
    cy.visit("/");

    cy.get("#cardYear > input").type("3");
    cy.get("#cardYearError").should("exist");
  });

  it("fills out entire form correctly", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win.console, "log").as("consoleLog");
      },
    });

    cy.get("#submitButton").should("be.disabled");

    cy.get("#cardName > input").type("Rikard Bergqvist");
    cy.get("#cardNameError").should("not.exist");

    cy.get("#cardNumber > input").type("4485 2944 6738 9141");
    cy.get("#cardNumberError").should("not.exist");

    cy.get("#cardCVV > input").type("999");
    cy.get("#cardCVVError").should("not.exist");

    cy.get("#cardMonth > input").type("12");
    cy.get("#cardMonthError").should("not.exist");

    cy.get("#cardYear > input").type("32");
    cy.get("#cardYearError").should("not.exist");

    cy.get("#submitButton").should("be.enabled");
    cy.get("#submitButton").click();

    cy.get("@consoleLog").should("be.calledWith", "payment complete!");
  });

  it("fills out entire form incorrectly", () => {
    cy.visit("/");

    cy.get("#submitButton").should("be.disabled");

    cy.get("#cardName > input").type("Ri{backspace}");
    cy.get("#cardNameError").should("exist");

    cy.get("#cardNumber > input").type("471");
    cy.get("#cardNumberError").should("exist");

    cy.get("#cardCVV > input").type("99");
    cy.get("#cardCVVError").should("exist");

    cy.get("#cardMonth > input").type("9");
    cy.get("#cardMonthError").should("exist");

    cy.get("#cardYear > input").type("3");
    cy.get("#cardYearError").should("exist");

    cy.get("#submitButton").should("be.disabled");
  });
});
