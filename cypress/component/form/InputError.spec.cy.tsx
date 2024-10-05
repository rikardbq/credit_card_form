import React from "react";
import InputError from "../../../src/components/form/InputError";

describe("<Input />", () => {
  it("renders", () => {
    const id = "fieldName";
    const isError = true;
    const errorMsg = "Something went wrong";

    cy.mount(
      <InputError
        {...{
          id,
          isError,
          errorMsg,
        }}
      />
    );

    cy.get("#fieldName").should("have.text", "Something went wrong");
  });
});
