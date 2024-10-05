/**
 * Credit card number client-side validation
 * using Luhn's algorithm
 * Reference: https://www.freeformatter.com/credit-card-number-generator-validator.html
 *
 * The Luhn Formula:
 * Drop the last digit from the number. The last digit is what we want to check against
 * Reverse the numbers
 * Multiply the digits in odd positions (1, 3, 5, etc.) by 2 and subtract 9 to all any result higher than 9
 * Add all the numbers together
 * The check digit (the last number of the card) is the amount that you would need to add to get a multiple of 10 (Modulo 10)
 *
 * example credit card number: 4716744888193307
 */

export const validateCreditCardNumber = (inputCreditCardNumber: string) => {
  let creditCardNumber = inputCreditCardNumber.replaceAll(/\s/g, "");
  const creditCardBrandSchema = getCreditCardBrandSchema(creditCardNumber);

  if (
    !/[0-9]+/g.test(creditCardNumber) ||
    creditCardBrandSchema === undefined ||
    creditCardNumber.length < creditCardBrandSchema.maxLength
  ) {
    return false;
  }

  const creditCardNumberArr = creditCardNumber.split("");
  const lastDigit = parseInt(creditCardNumberArr.pop() || "");

  const numberSum = creditCardNumberArr.reverse().reduce((acc, n, i) => {
    let n_int = parseInt(n);

    if ((i + 1) % 2 !== 0) {
      n_int = n_int * 2;

      if (n_int > 9) {
        n_int = n_int - 9;
      }
    }

    return acc + n_int;
  }, 0);

  return numberSum % 10 === lastDigit;
};

// bit from stackoverflow
// Reference: https://stackoverflow.com/questions/25101781/javascript-regex-split-credit-card-numbers
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

export const getCreditCardBrandSchema = (inputCreditCardNumber: string) =>
  creditCardBrandSchemas.find((item, _) =>
    item.identifierPattern.test(inputCreditCardNumber)
  );
