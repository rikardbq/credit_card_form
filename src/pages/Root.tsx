import { useEffect, useMemo, useState /* useCallback */ } from "react";
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

const numberRegexp = /^[0-9]+$/;
const validationSchema: GenericObject = {
  cardName: {
    regexp: /^[a-zA-ZåäöÅÄÖ-\s]+$/,
  },
  cardNumber: {
    regexp: /^[0-9\s]+$/,
    fn: (cCNum: string) => validateCreditCardNumber(cCNum),
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
    errorMsg: "cvv must be 3 digits",
  },
  month: {
    value: "",
    isValid: true,
    errorMsg: "Month must be 12 or lower and be made up of 2 digits",
  },
  year: {
    value: "",
    isValid: true,
    errorMsg: "Year must be 99 or lower and be made up of 2 digits",
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

  // const validateForm = useCallback(
  //   (form: any) => {
  //     const { cardName, lastName, cardNumber, cvv, validity } = form;
  //     let isValid = true;

  //     isValid = isValid && validationSchema.cardName.regexp.test(cardName);
  //     isValid = isValid && validationSchema.lastName.regexp.test(lastName);
  //     isValid =
  //       isValid && validationSchema.cardNumber.fn(cardNumber);
  //     isValid = isValid && validationSchema.cvv.regexp.test(cvv);
  //     isValid = isValid && validationSchema.month.regexp.test(validity.month);
  //     isValid = isValid && validationSchema.year.regexp.test(validity.year);

  //     return isValid;
  //   },
  //   [
  // formState.cardName,
  // formState.lastName,
  // formState.cardNumber,
  // formState.cvv,
  // formState.validity.month,
  // formState.validity.year,
  //   ]
  // );

  // const [isFormValid, setIsFormValid] = useState(false);

  const formFieldHandler = (field: string, value: string) => {
    switch (field) {
      case "cardName":
        if (value.length === 0 || validationSchema[field].regexp.test(value)) {
          setFormState({
            ...formState,
            [field]: {
              ...formState[field],
              value,
            },
          });
        }
        break;
      case "cardNumber":
        if (value.length === 0 || validationSchema[field].regexp.test(value)) {
          const brandSchema = getCreditCardBrandSchema(value);

          if (brandSchema !== undefined) {
            const valueNoSpaces = value.replaceAll(/\s/g, "");
            let regexpState = brandSchema.separationPattern.exec(valueNoSpaces);

            while (regexpState !== null) {
              const [, m1, m2, m3, m4] = regexpState;
              const str = [m1, m2, m3, m4]
                .filter((v) => v !== undefined)
                .join(" ");

              value = str;
              regexpState = brandSchema.separationPattern.exec(valueNoSpaces);
            }

            if (valueNoSpaces.length <= brandSchema.maxLength) {
              setFormState({
                ...formState,
                [field]: {
                  ...formState[field],
                  value,
                },
              });
            }
          } else {
            setFormState({
              ...formState,
              [field]: {
                ...formState[field],
                value,
              },
            });
          }
        }
        break;
      case "month":
      case "year":
      case "cvv":
        if (value.length === 0 || validationSchema[field].regexp.test(value)) {
          if (value.length <= validationSchema[field].maxLength) {
            setFormState({
              ...formState,
              [field]: {
                ...formState[field],
                value,
              },
            });
          }
        }
        break;
      default:
        break;
    }
  };

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
          <div>{formState.cardNumber.value}</div>
          <div>{formState.cardName.value}</div>
          <div>
            {formState.month.value} / {formState.year.value}
          </div>
        </div>
      </div>
      <Input
        title="Card name"
        name="cardName"
        type="text"
        value={formState.cardName.value}
        valueSetter={(name: string, val: string) => formFieldHandler(name, val)}
      />
      <Input
        title="Card number"
        name="cardNumber"
        type="text"
        value={formState.cardNumber.value}
        valueSetter={(name: string, val: string) => formFieldHandler(name, val)}
      />
      <div
        className="grid gap10"
        style={{ gridTemplateColumns: "0fr 0fr 1fr" }}
      >
        <Input
          title="MM"
          name="month"
          type="text"
          width="16px"
          value={formState.month.value}
          valueSetter={(name: string, val: string) =>
            formFieldHandler(name, val)
          }
        />
        <Input
          title="YY"
          name="year"
          type="text"
          width="16px"
          value={formState.year.value}
          valueSetter={(name: string, val: string) =>
            formFieldHandler(name, val)
          }
        />
        <Input
          title="CVV"
          name="cvv"
          type="text"
          width="24px"
          value={formState.cvv.value}
          valueSetter={(name: string, val: string) =>
            formFieldHandler(name, val)
          }
        />
      </div>
      <div className="flexCol gap20 centeredHorizontal">
        <button onClick={() => makePayment()}>PAY</button>
      </div>
    </FormBody>
  );
};

export default Root;
