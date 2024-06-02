import { useState, useEffect } from "react"
import { CFormInput, CInputGroup, CFormTextarea } from "@coreui/react"
import ChildrenBlur from "../children-blur"
import CustomDatePicker from "../date-picker"
import CIcon from "@coreui/icons-react"
import { cilCircle, cilCheckAlt } from "@coreui/icons"
import "./index.scss"

const initialState = {
  status: 0,
  title: "",
  details: "",
  scheduled_at: null,
}

const TaskForm = ({ submitHandler, setNewTask, isVisible, task }) => {
  const [formData, setFormData] = useState(initialState)
  const [isCalenderVisible, setCalenderVisibility] = useState(false)
  const [datePickerState, setDatePicketState] = useState(false)

  useEffect(() => {
    document.getElementById("task-form-input")?.focus()
    if (task) {
      setFormData(task)
    }
  }, [task])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((previousLoginState) => ({
      ...previousLoginState,
      [name]: value,
    }))
  }

  const setDate = (date) => {
    console.error('setDate', date)
    setFormData((previousLoginState) => ({
      ...previousLoginState,
      scheduled_at: date,
    }))
    setDatePicketState(true)
  }

  const handleBlur = () => {
    console.error("handleBlur", datePickerState)
    if(datePickerState){
      setDatePicketState(false)
    } else {
      onSubmit()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit()
    }
  }

  const onSubmit = () => {
    if (isCalenderVisible) {
      return
    }
    if (formData.title.trim()) {
      submitHandler(formData)
    }
    setNewTask(false)
  }

  const updateTaskStatus = () => {
    const status = formData.status ? 0 : 1
    handleInputChange({ target: { name: "status", value: status } })
  }
  return (
    <ChildrenBlur
      id="task-form-wrapper"
      className="task-form-wrapper"
      onBlur={handleBlur}
    >
      <div className="task-form" role="form">
        {formData.status ? (
          <CIcon
            size="xl"
            className="task-complete-icon"
            icon={cilCheckAlt}
            title="Mark Completed"
            onClick={updateTaskStatus}
          />
        ) : (
          <CIcon
            size="xl"
            className="task-incomplete-icon"
            title="Mark Pending"
            icon={cilCircle}
            onClick={updateTaskStatus}
          />
        )}
        <div style={{ width: "100%" }}>
          <CInputGroup className="mb-3">
            <CFormInput
              id="task-form-input"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              aria-describedby="List title"
              className="task-input"
              onKeyDown={handleKeyDown}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CFormTextarea
              name="details"
              placeholder="Enter details"
              value={formData.details}
              onChange={handleInputChange}
              aria-describedby="List title"
              className="task-input"
            ></CFormTextarea>
          </CInputGroup>
          <CustomDatePicker
            setDate={setDate}
            setCalenderVisibility={setCalenderVisibility}
            value={formData.scheduled_at}
          />
        </div>
      </div>
    </ChildrenBlur>
  )
}

export default TaskForm
