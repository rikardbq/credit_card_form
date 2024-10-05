import React from "react";
import Input from "../../../src/components/form/Input";

describe("<Input />", () => {
  it("renders", () => {
    const name = "fieldName";
    const title = "Field Name";
    const type = "text";
    const field = {
      value: "Hello",
    };
    const mutateFormState = () => {};
    const valueSetter = () => {};
    const validate = () => {};

    cy.mount(
      <Input
        {...{
          name,
          title,
          type,
          field,
          mutateFormState,
          valueSetter,
          validate,
        }}
      />
    );

    cy.get("label").should("have.text", "Field Name");
    cy.get("input")
      .should("have.attr", "name", "fieldName")
      .should("have.attr", "type", "text")
      .should("have.attr", "value", "Hello");
  });
});
