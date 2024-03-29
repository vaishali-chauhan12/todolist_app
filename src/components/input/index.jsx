import "./index.scss"

const Input = (props) => {
  const {
    type,
    id,
    className,
    isLabel,
    labelText,
    required,
    name,
    title,
    placeholder,
    value,
    disabled,
    error,
    onChangeHandler,
  } = props
  const wrapperClassList = className
    ? `input-container ${className}-container`
    : "input-container"
  const classList = className ? `input-field ${className}` : "input-field"

  return (
    <div className={wrapperClassList}>
      {isLabel && labelText && (
        <label htmlFor={id} className="input-field__label">
          {labelText}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={classList}
        title={title}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChangeHandler}
        name={name}
        disabled={disabled}
      />
      {error && <span className="input-field__error">{error}</span>}
    </div>
  )
}

export default Input
