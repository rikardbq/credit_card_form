import "../../mainStyles.css";
import "./formStyles.css";

type FormBodyProps = {
  children: JSX.Element | JSX.Element[];
};

const FormBody = ({ children, ...restProps }: FormBodyProps) => {
  return (
    <div className="formWrapper flexCol">
      <div className="formBody flexCol rounded shadowing gap10">{children}</div>
    </div>
  );
};

export default FormBody;
