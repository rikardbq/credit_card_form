import { useEffect } from "react";
import "../../styles/form/formStyles.css";

type InputProps = {
  id?: string;
  name: string;
  title: string;
  type: string;
  field: any;
  formTouched?: boolean;
  mutateFormState: Function;
  valueSetter: Function;
  validate?: Function;
  width?: string;
};

const Input = ({
  id,
  name,
  title,
  type,
  field,
  formTouched,
  mutateFormState,
  valueSetter,
  validate,
  width,
}: InputProps) => {
  useEffect(() => {
    if (
      field.value !== undefined &&
      (formTouched === undefined || formTouched)
    ) {
      validate &&
        mutateFormState(name, ["isValid", validate(name, field.value)]);
    }
  }, [field.value, formTouched]);

  return (
    <div id={id} className="flexCol">
      <label>{title}</label>
      <input
        name={name}
        type={type}
        value={field.value || ""}
        onChange={(e) => {
          valueSetter(name, e.target.value, mutateFormState);
        }}
        style={{
          width,
        }}
      />
    </div>
  );
};

export default Input;
