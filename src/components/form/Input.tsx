import "./formStyles.css";

type InputProps = {
  name: string | undefined;
  title: string | undefined;
  type: string | undefined;
  value: string | number | undefined;
  valueSetter: Function | undefined;
  width?: string | undefined;
};

const Input = ({
  name,
  title,
  type,
  value,
  valueSetter,
  width,
  ...restProps
}: InputProps) => {
  return (
    <div className="flexCol">
      <label>{title}</label>
      <input
        {...restProps}
        name={name}
        type={type}
        value={value}
        onChange={(e) => {
          valueSetter && valueSetter(name, e.target.value);
        }}
        style={{
          width
        }}
      />
    </div>
  );
};

export default Input;
