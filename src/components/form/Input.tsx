import { useEffect } from "react";
import "./formStyles.css";

type InputProps = {
  name: string;
  title: string;
  type: string;
  field: any;
  valueSetter: Function;
  validate?: Function;
  width?: string;
};

const Input = ({
  name,
  title,
  type,
  field,
  valueSetter,
  validate,
  width,
  ...restProps
}: InputProps) => {
  useEffect(() => {
    validate && validate(name, field.value);
  }, [field.value]);

  return (
    <div className="flexCol">
      <label>{title}</label>
      <input
        {...restProps}
        name={name}
        type={type}
        value={field.value}
        onChange={(e) => {
          valueSetter(name, e.target.value);
        }}
        style={{
          width,
        }}
      />
    </div>
  );
};

export default Input;
