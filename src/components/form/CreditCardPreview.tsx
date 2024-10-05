import "../../styles/mainStyles.css";
import "../../styles/form/formStyles.css";

type CreditCardPreviewProps = {
  formTouched?: boolean;
  name?: string;
  number?: string;
  cvv?: string;
  month?: string;
  year?: string;
};

const CreditCardPreview = ({
  formTouched,
  name = "",
  number = "",
  cvv = "",
  month = "",
  year = "",
}: CreditCardPreviewProps) => {
  return (
    <div
      className={`formCreditCardPreview rounded shadowing animated ${
        formTouched && "formCreditCardPreviewActive"
      }`}
    >
      <div>{`name: ${name}`}</div>
      <div>{`number: ${number}`}</div>
      <div>{`cvv: ${cvv}`}</div>
      <div>{`month: ${month}`}</div>
      <div>{`year: ${year}`}</div>
    </div>
  );
};

export default CreditCardPreview;
