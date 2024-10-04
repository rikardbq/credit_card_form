import { useCallback, useEffect, useMemo, useState } from "react";
import {
  validateCreditCardNumber,
  getCreditCardBrandSchema,
} from "../util/creditCard";
import { makePayment } from "../service/creditCard";
import FormBody from "../components/form/FormBody";
import Input from "../components/form/Input";

import "../mainStyles.css";
import "../components/form/formStyles.css";

type GenericObject = {
  [key: string]: any;
};

const numberRegexp = /[0-9]+/;
const validationSchema: GenericObject = {
  cardName: {
    regexp: /^[a-zA-ZåäöÅÄÖ-\s]+$/,
    minLength: 2,
  },
  cardNumber: {
    regexp: /^[0-9\s]+$/,
    fn: (cCNum: string) => validateCreditCardNumber(cCNum),
    maxLength: 24,
  },
  cvv: {
    regexp: numberRegexp,
    minLength: 3,
    maxLength: 3,
  },
  month: {
    minValue: 1,
    maxValue: 12,
    minLength: 2,
    maxLength: 2,
    regexp: numberRegexp,
  },
  year: {
    minValue: 0,
    maxValue: 99,
    minLength: 2,
    maxLength: 2,
    regexp: numberRegexp,
  },
};

const initialFormState: GenericObject = {
  cardName: {
    value: "",
    isValid: true,
    errorMsg: "Name can only contain letters in the range [a-zA-ZåäöÅÄÖ]",
  },
  cardNumber: {
    value: "",
    isValid: true,
    errorMsg: "Credit card isn't matching any known format",
  },
  cvv: {
    value: "",
    isValid: true,
    errorMsg: "CVV must be 3 digits",
  },
  month: {
    value: "",
    isValid: true,
    errorMsg: "Month must be in the range 1-12 and be made up of 2 digits",
  },
  year: {
    value: "",
    isValid: true,
    errorMsg: "Year must be in the range 0-99 and be made up of 2 digits",
  },
};

const Root = () => {
  const [formState, setFormState] = useState(initialFormState);
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    setFormTouched(Object.values(formState).some((v) => v.value !== ""));
  }, [
    formState.cardName.value,
    formState.cardNumber.value,
    formState.cvv.value,
    formState.month.value,
    formState.year.value,
  ]);

  const mutateFormState = useCallback(
    (field: string, [key, val]: [string, any]) => {
      setFormState({
        ...formState,
        [field]: {
          ...formState[field],
          [key]: val,
        },
      });
    },
    [
      formState.cardName.value,
      formState.cardName.isValid,
      formState.cardNumber.value,
      formState.cardNumber.isValid,
      formState.cvv.value,
      formState.cvv.isValid,
      formState.month.value,
      formState.month.isValid,
      formState.year.value,
      formState.year.isValid,
    ]
  );

  const validateField = useCallback(
    (field: string, value: string) => {
      if (formTouched) {
        const fieldSchema = validationSchema[field];
        let isValid = true;

        if (!!fieldSchema.regexp) {
          isValid = isValid && fieldSchema.regexp.test(value);
        }
        if (!!fieldSchema.maxValue) {
          const valueAsNumber = parseInt(value);
          isValid =
            isValid &&
            !Number.isNaN(valueAsNumber) &&
            valueAsNumber <= fieldSchema.maxValue;
        }
        if (!!fieldSchema.minLength) {
          const valueNoSpaces = value.replaceAll(/\s/g, "");
          isValid = isValid && valueNoSpaces.length >= fieldSchema.minLength;
        }
        if (!!fieldSchema.maxLength) {
          const valueNoSpaces = value.replaceAll(/\s/g, "");
          isValid = isValid && valueNoSpaces.length <= fieldSchema.maxLength;
        }
        if (!!fieldSchema.fn) {
          isValid = isValid && fieldSchema.fn(value);
        }

        mutateFormState(field, ["isValid", isValid]);
      }
    },
    [
      formTouched,
      formState.cardName.value,
      formState.cardNumber.value,
      formState.cvv.value,
      formState.month.value,
      formState.year.value,
    ]
  );

  const formFieldHandler = (field: string, value: string) => {
    if (field === "cardName") {
      if (value.length === 0 || validationSchema[field].regexp.test(value)) {
        mutateFormState(field, ["value", value]);
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
            mutateFormState(field, ["value", value]);
          }
        } else {
          mutateFormState(field, ["value", value]);
        }
      }
    } else if (field === "month" || field === "year" || field === "cvv") {
      const fieldSchema = validationSchema[field];

      if (
        (value.length === 0 || fieldSchema.regexp.test(value)) &&
        value.length <= fieldSchema.maxLength
      ) {
        mutateFormState(field, ["value", value]);
      }
    }
  };

  const formHasErrors = useMemo(
    () =>
      !formTouched ||
      Object.values(formState).some((v) => !v.isValid || v.value === ""),
    [
      formTouched,
      formState.cardName.value,
      formState.cardName.isValid,
      formState.cardNumber.value,
      formState.cardNumber.isValid,
      formState.cvv.value,
      formState.cvv.isValid,
      formState.month.value,
      formState.month.isValid,
      formState.year.value,
      formState.year.isValid,
    ]
  );

  return (
    <FormBody>
      <div
        className="centeredHorizontal"
        style={{
          height: "60px",
        }}
      >
        <div
          className={`formCreditCardPreview rounded shadowing animated ${
            formTouched && "formCreditCardPreviewActive"
          }`}
        >
          <div>{`name: ${formState.cardName.value}`}</div>
          <div>{`number: ${formState.cardNumber.value}`}</div>
          <div>{`cvv: ${formState.cvv.value}`}</div>
          <div>{`month: ${formState.month.value}`}</div>
          <div>{`year: ${formState.year.value}`}</div>
        </div>
      </div>
      <Input
        title="Card name"
        name="cardName"
        type="text"
        field={formState.cardName}
        valueSetter={formFieldHandler}
        validate={validateField}
      />
      {!formState.cardName.isValid ? (
        <div style={{ color: "red" }}>{formState.cardName.errorMsg}</div>
      ) : (
        <></>
      )}
      <div className="grid gap10" style={{ gridTemplateColumns: "1fr 0fr" }}>
        <div>
          <Input
            title="Card number"
            name="cardNumber"
            type="text"
            field={formState.cardNumber}
            valueSetter={formFieldHandler}
            validate={validateField}
          />
          {!formState.cardNumber.isValid ? (
            <div style={{ color: "red" }}>{formState.cardNumber.errorMsg}</div>
          ) : (
            <></>
          )}
          {!formState.cvv.isValid ? (
            <div style={{ color: "red" }}>{formState.cvv.errorMsg}</div>
          ) : (
            <></>
          )}
        </div>
        <Input
          title="CVV"
          name="cvv"
          type="text"
          width="24px"
          field={formState.cvv}
          valueSetter={formFieldHandler}
          validate={validateField}
        />
      </div>

      <div>Expiration</div>
      {!formState.month.isValid ? (
        <div style={{ color: "red" }}>{formState.month.errorMsg}</div>
      ) : (
        <></>
      )}
      {!formState.year.isValid ? (
        <div style={{ color: "red" }}>{formState.year.errorMsg}</div>
      ) : (
        <></>
      )}
      <div className="grid gap10" style={{ gridTemplateColumns: "0fr 0fr" }}>
        <Input
          title="MM"
          name="month"
          type="text"
          width="14px"
          field={formState.month}
          valueSetter={formFieldHandler}
          validate={validateField}
        />
        <Input
          title="YY"
          name="year"
          type="text"
          width="14px"
          field={formState.year}
          valueSetter={formFieldHandler}
          validate={validateField}
        />
      </div>
      <div className="flexCol gap20 centeredHorizontal">
        <button disabled={formHasErrors} onClick={() => makePayment()}>
          PAY
        </button>
      </div>
    </FormBody>
  );
};

export default Root;
