import { useState } from "react";
import { getCreditCardBrandSchema } from "../util/creditCard";
import { GenericObject } from "../types";
import {
  validationSchema,
  validateFieldAccordingToSchema,
} from "../util/formValidation";
import { makePayment } from "../service/creditCard";
import FormBody from "../components/form/FormBody";
import Input from "../components/form/Input";

import "../styles/mainStyles.css";
import CreditCardPreview from "../components/form/CreditCardPreview";
import InputError from "../components/form/InputError";

const initialFormState: GenericObject = {
  cardName: {
    value: undefined,
    isValid: true,
    errorMsg: "Name can only contain letters in the range [a-zA-ZåäöÅÄÖ]",
  },
  cardNumber: {
    value: undefined,
    isValid: true,
    errorMsg: "Credit card isn't matching any known format",
  },
  cardCVV: {
    value: undefined,
    isValid: true,
    errorMsg: "CVV must be 3 digits",
  },
  cardMonth: {
    value: undefined,
    isValid: true,
    errorMsg: "Month must be in the range 1-12 and be made up of 2 digits",
  },
  cardYear: {
    value: undefined,
    isValid: true,
    errorMsg: "Year must be in the range 0-99 and be made up of 2 digits",
  },
};

const Root = () => {
  const [formState, setFormState] = useState(initialFormState);

  const mutateFormState = (field: string, [key, val]: [string, any]) => {
    setFormState({
      ...formState,
      [field]: {
        ...formState[field],
        [key]: val,
      },
    });
  };

  const formFieldHandler = (field: string, value: string, cb: Function) => {
    if (field === "cardName") {
      if (value.length === 0 || validationSchema[field].regexp.test(value)) {
        cb(field, ["value", value]);
      }
    } else if (field === "cardNumber") {
      if (value.length === 0 || validationSchema[field].regexp.test(value)) {
        const brandSchema = getCreditCardBrandSchema(value);

        if (brandSchema !== undefined) {
          const valueNoSpaces = value.replaceAll(/\s/g, "");
          let regexpState = brandSchema.separationPattern.exec(valueNoSpaces);
          validationSchema[field].maxLength = brandSchema.maxLength;

          while (regexpState !== null) {
            const [, m1, m2, m3, m4] = regexpState;
            const str = [m1, m2, m3, m4]
              .filter((v) => v !== undefined)
              .join(" ");

            value = str;
            regexpState = brandSchema.separationPattern.exec(valueNoSpaces);
          }

          if (valueNoSpaces.length <= brandSchema.maxLength) {
            cb(field, ["value", value]);
          }
        } else {
          cb(field, ["value", value]);
        }
      }
    } else if (
      field === "cardMonth" ||
      field === "cardYear" ||
      field === "cardCVV"
    ) {
      const fieldSchema = validationSchema[field];

      if (
        (value.length === 0 || fieldSchema.regexp.test(value)) &&
        value.length <= fieldSchema.maxLength
      ) {
        cb(field, ["value", value]);
      }
    }
  };

  const formTouched = Object.values(formState).some((v) => v.value !== "");
  const formHasErrors =
    !formTouched ||
    Object.values(formState).some((v) => !v.isValid || v.value === "");

  return (
    <FormBody>
      <div
        className="centeredHorizontal"
        style={{
          height: "60px",
        }}
      >
        <CreditCardPreview
          formTouched={formTouched}
          name={formState.cardName.value}
          number={formState.cardNumber.value}
          cvv={formState.cardCVV.value}
          month={formState.cardMonth.value}
          year={formState.cardYear.value}
        />
      </div>
      <Input
        id="cardName"
        title="Card name"
        name="cardName"
        type="text"
        field={formState.cardName}
        mutateFormState={mutateFormState}
        valueSetter={formFieldHandler}
        validate={validateFieldAccordingToSchema(validationSchema, formTouched)}
      />
      <InputError
        id="cardNameError"
        isError={!formState.cardName.isValid}
        errorMsg={formState.cardName.errorMsg}
      />
      <div className="grid gap10" style={{ gridTemplateColumns: "1fr 0fr" }}>
        <div className="flexCol gap10">
          <Input
            id="cardNumber"
            title="Card number"
            name="cardNumber"
            type="text"
            field={formState.cardNumber}
            mutateFormState={mutateFormState}
            valueSetter={formFieldHandler}
            validate={validateFieldAccordingToSchema(
              validationSchema,
              formTouched
            )}
          />
          <InputError
            id="cardNumberError"
            isError={!formState.cardNumber.isValid}
            errorMsg={formState.cardNumber.errorMsg}
          />
          <InputError
            id="cardCVVError"
            isError={!formState.cardCVV.isValid}
            errorMsg={formState.cardCVV.errorMsg}
          />
        </div>
        <div>
          <Input
            id="cardCVV"
            title="CVV"
            name="cardCVV"
            type="text"
            width="24px"
            field={formState.cardCVV}
            mutateFormState={mutateFormState}
            valueSetter={formFieldHandler}
            validate={validateFieldAccordingToSchema(
              validationSchema,
              formTouched
            )}
          />
        </div>
      </div>
      <div className="flexCol gap10">
        <label>Expiration</label>
        <InputError
          id="cardMonthError"
          isError={!formState.cardMonth.isValid}
          errorMsg={formState.cardMonth.errorMsg}
        />
        <InputError
          id="cardYearError"
          isError={!formState.cardYear.isValid}
          errorMsg={formState.cardYear.errorMsg}
        />
      </div>
      <div className="grid gap10" style={{ gridTemplateColumns: "0fr 0fr" }}>
        <Input
          id="cardMonth"
          title="MM"
          name="cardMonth"
          type="text"
          width="14px"
          field={formState.cardMonth}
          mutateFormState={mutateFormState}
          valueSetter={formFieldHandler}
          validate={validateFieldAccordingToSchema(
            validationSchema,
            formTouched
          )}
        />
        <Input
          id="cardYear"
          title="YY"
          name="cardYear"
          type="text"
          width="14px"
          field={formState.cardYear}
          mutateFormState={mutateFormState}
          valueSetter={formFieldHandler}
          validate={validateFieldAccordingToSchema(
            validationSchema,
            formTouched
          )}
        />
      </div>
      <div className="flexCol gap20 centeredHorizontal">
        <button
          id="submitButton"
          disabled={formHasErrors}
          onClick={() => makePayment()}
        >
          PAY
        </button>
      </div>
    </FormBody>
  );
};

export default Root;
