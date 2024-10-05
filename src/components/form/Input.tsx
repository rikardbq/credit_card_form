import { useEffect } from "react";
import "../../styles/form/formStyles.css";

type InputProps = {
  id?: string;
  name: string;
  title: string;
  type: string;
  field: any;
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
  mutateFormState,
  valueSetter,
  validate,
  width,
}: InputProps) => {
  useEffect(() => {
    validate && validate(name, field.value, mutateFormState);
  }, [field.value]);

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
