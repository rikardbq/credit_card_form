import "../../styles/mainStyles.css";
import "../../styles/form/formStyles.css";

type FormBodyProps = {
  children: JSX.Element | JSX.Element[];
};

const FormBody = ({ children }: FormBodyProps) => {
  return (
    <div className="formWrapper flexCol">
      <div className="formBody flexCol rounded shadowing gap10">{children}</div>
    </div>
  );
};

export default FormBody;
