import { CButton } from "@coreui/react"

import "./index.scss"

const Button = (props) => {
  const {
    type,
    color = "success",
    variant,
    children,
    className = "",
    clickHandler,
  } = props

  return (
    <CButton
      type={type}
      color={color}
      variant={variant}
      className={className}
      onClick={clickHandler}
    >
      {children}
    </CButton>
  )
}

export default Button
