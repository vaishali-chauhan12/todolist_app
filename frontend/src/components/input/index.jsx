import { CFormInput } from "@coreui/react";

import "./index.scss";

const Input = (props) => {
  const {
    type,
    id,
    className,
    labelText,
    required,
    name,
    title,
    placeholder,
    value,
    disabled,
    error,
    onChangeHandler,
    inputOnBlur = () => {}
  } = props;
  const wrapperClassList = className
    ? `input-container ${className}-container`
    : "input-container";
  const classList = className ? `input-field ${className}` : "input-field";

  return (
    <div className={wrapperClassList}>
      <CFormInput
        id={id}
        type={type}
        className={error ? `${classList} input-error`: classList}
        title={title}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChangeHandler}
        onBlur={inputOnBlur}
        name={name}
        disabled={disabled}
        label={labelText}
      />
      {error && <span className="input-field__error">{error}</span>}
    </div>
  );
};

export default Input;
