import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react"
import Button from "../../components/button"

const Modal = function (props) {
  const {
    title,
    children,
    setVisible,
    primaryButtonText,
    secondaryButtonText = "Close",
    showFooter = false,
  } = props

  return (
    <CModal
      visible={true}
      onClose={() => setVisible(false)}
      aria-labelledby="ListFormModal"
    >
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle id="ListFormModal">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{children}</CModalBody>
      {showFooter && (
        <CModalFooter>
          <Button color="secondary" onClick={() => setVisible(false)}>
            {secondaryButtonText}
          </Button>
          <Button>{primaryButtonText}</Button>
        </CModalFooter>
      )}
    </CModal>
  )
}

export default Modal
