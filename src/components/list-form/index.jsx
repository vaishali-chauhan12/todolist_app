import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { CForm, CFormInput, CInputGroup } from "@coreui/react"
import Button from "../button"
import "./index.scss"

const initialState = {
  title: "",
  note: "",
}

const ListForm = ({ submitHandler, listData, buttonText }) => {
  const [formData, setFormData] = useState(initialState)
  const userId = useSelector((state) => state.authUser.userId)

  useEffect(() => {
    if (listData) {
      setFormData(listData)
    }
  }, [listData])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((previousLoginState) => ({
      ...previousLoginState,
      [name]: value,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    formData.userId = userId
    formData.title && submitHandler(formData)
  }
  return (
    <CForm onSubmit={onSubmit} role="form">
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          name="title"
          placeholder="List Name"
          value={formData.title}
          onChange={handleInputChange}
          aria-describedby="List title"
        />
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleInputChange}
          aria-describedby="List title"
        />
      </CInputGroup>
      <Button type="submit" className="float-right">
        {buttonText ? buttonText : "Save"}
      </Button>
    </CForm>
  )
}

export default ListForm
