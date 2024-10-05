type InputErrorProps = {
  id?: string;
  isError?: boolean;
  errorMsg?: string;
};

const InputError = ({ id, isError, errorMsg }: InputErrorProps) => {
  return isError ? (
    <div id={id} style={{ color: "red" }}>
      {errorMsg}
    </div>
  ) : (
    <></>
  );
};

export default InputError;
