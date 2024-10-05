import {
  validateCreditCardNumber,
  getCreditCardBrandSchema,
} from "../src/util/creditCard";

const creditCardBrandSchemas = [
  {
    name: "American Express",
    identifierPattern: /^3[47][0-9]/,
    separationPattern: /^([0-9]{4})([0-9]{6})?(?:([0-9]{6})([0-9]{5}))?$/g,
    maxLength: 15,
  },
  {
    name: "MasterCard",
    identifierPattern: /^5[1-5][0-9]/,
    separationPattern: /^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$/g,
    maxLength: 16,
  },
  {
    name: "Visa",
    identifierPattern: /^4[0-9]/,
    separationPattern: /^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$/g,
    maxLength: 16,
  },
];

describe("credit card number", () => {
  it("is valid", () => {
    const creditCardNumber = "375127892947456";

    expect(validateCreditCardNumber(creditCardNumber)).toBe(true);
  });

  it("is invalid", () => {
    const creditCardNumber = "4485294467389145";

    expect(validateCreditCardNumber(creditCardNumber)).toBe(false);
  });

  it("is American Express", () => {
    const creditCardNumber = "375127892947456";
    const creditCardBrandSchema =
      getCreditCardBrandSchema(creditCardNumber);

    expect(creditCardBrandSchema).toMatchObject(creditCardBrandSchemas[0]);
    expect(creditCardBrandSchema).toHaveProperty(
      "identifierPattern",
      /^3[47][0-9]/
    );
    expect(creditCardBrandSchema).toHaveProperty(
      "separationPattern",
      /^([0-9]{4})([0-9]{6})?(?:([0-9]{6})([0-9]{5}))?$/g
    );
    expect(creditCardBrandSchema).toHaveProperty("maxLength", 15);
  });

  it("is MasterCard", () => {
    const creditCardNumber = "5217146785686667";
    const creditCardBrandSchema =
      getCreditCardBrandSchema(creditCardNumber);

    expect(creditCardBrandSchema).toMatchObject(creditCardBrandSchemas[1]);
    expect(creditCardBrandSchema).toHaveProperty(
      "identifierPattern",
      /^5[1-5][0-9]/
    );
    expect(creditCardBrandSchema).toHaveProperty(
      "separationPattern",
      /^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$/g
    );
    expect(creditCardBrandSchema).toHaveProperty("maxLength", 16);
  });

  it("is Visa", () => {
    const creditCardNumber = "4716739190742254";
    const creditCardBrandSchema =
      getCreditCardBrandSchema(creditCardNumber);

    expect(creditCardBrandSchema).toMatchObject(creditCardBrandSchemas[2]);
    expect(creditCardBrandSchema).toHaveProperty(
      "identifierPattern",
      /^4[0-9]/
    );
    expect(creditCardBrandSchema).toHaveProperty(
      "separationPattern",
      /^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$/g
    );
    expect(creditCardBrandSchema).toHaveProperty("maxLength", 16);
  });
});
