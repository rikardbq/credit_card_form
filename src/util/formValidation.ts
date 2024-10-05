import { GenericObject } from "../types";
import { validateCreditCardNumber } from "./creditCard";

const numberRegexp = /^[0-9]+$/;
export const validationSchema: GenericObject = {
  cardName: {
    regexp: /^[a-zA-ZåäöÅÄÖ-\s]+$/,
    minLength: 2,
  },
  cardNumber: {
    regexp: /^[0-9\s]+$/,
    fn: (cCNum: string) => validateCreditCardNumber(cCNum),
  },
  cardCVV: {
    regexp: numberRegexp,
    minLength: 3,
    maxLength: 3,
  },
  cardMonth: {
    minValue: 1,
    maxValue: 12,
    minLength: 2,
    maxLength: 2,
    regexp: numberRegexp,
  },
  cardYear: {
    minValue: 0,
    maxValue: 99,
    minLength: 2,
    maxLength: 2,
    regexp: numberRegexp,
  },
};

export const validateFieldAccordingToSchema =
  (schema: GenericObject) => (field: string, value: string) => {
    const fieldSchema = schema[field];
    let isValid = true;

    if (fieldSchema !== undefined) {
      Object.keys(fieldSchema).map((key: string) => {
        switch (key) {
          case "regexp": {
            isValid = isValid && fieldSchema[key].test(value);
            break;
          }
          case "maxValue": {
            const valueAsNumber = parseInt(value);
            isValid =
              isValid &&
              !Number.isNaN(valueAsNumber) &&
              valueAsNumber <= fieldSchema[key];
            break;
          }
          case "minLength": {
            const valueNoSpaces = value.replaceAll(/\s/g, "");
            isValid = isValid && valueNoSpaces.length >= fieldSchema[key];
            break;
          }
          case "maxLength": {
            const valueNoSpaces = value.replaceAll(/\s/g, "");
            isValid = isValid && valueNoSpaces.length <= fieldSchema[key];
            break;
          }
          case "fn": {
            isValid = isValid && fieldSchema[key](value);
            break;
          }
          default:
            break;
        }
      });
    }

    return isValid;
  };
