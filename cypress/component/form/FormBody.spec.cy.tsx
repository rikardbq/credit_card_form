import FormBody from "../../../src/components/form/FormBody";

describe("<FormBody />", () => {
  it("renders", () => {
    cy.mount(
      <FormBody>
        <div>children</div>
      </FormBody>
    );
  });
});
