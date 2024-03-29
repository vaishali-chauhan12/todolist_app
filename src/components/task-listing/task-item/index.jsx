import { useState, useCallback } from "react"
import CIcon from "@coreui/icons-react"
import { cilCircle, cilCheckAlt } from "@coreui/icons"
import TaskForm from "../../task-form"
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react"
import { cilOptions } from "@coreui/icons"

const TaskItem = ({
  task,
  updateTaskStatus,
  updateTaskDetail,
  deleteHandler,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [onRadioHover, setRadioHover] = useState(false)

  return (
    <div className="task-item-wrapper">
      {isEdit ? (
        <TaskForm
          task={task}
          submitHandler={updateTaskDetail}
          setNewTask={setIsEdit}
          isVisible={isEdit}
        />
      ) : (
        <div className="task-item">
          <div
            className="task-radio-button-wrapper"
            onMouseEnter={() => setRadioHover(true)}
            onMouseLeave={() => setRadioHover(false)}
          >
            {onRadioHover || task.status ? (
              <CIcon
                size="xl"
                className="task-complete-icon"
                icon={cilCheckAlt}
                title="Mark Completed"
                onClick={() => updateTaskStatus(task)}
              />
            ) : (
              <CIcon
                size="xl"
                className="task-incomplete-icon"
                icon={cilCircle}
                onClick={updateTaskStatus}
              />
            )}
          </div>
          <div className="task-details">
            <div
              className="task-details__title"
              onClick={() => setIsEdit(true)}
            >
              {task.title}
            </div>
            <div className="task-details__options">
              <CDropdown variant="btn-group">
                <CDropdownToggle
                  color="secondary"
                  size="sm"
                  className="task-options-dropdown-toggle"
                >
                  <CIcon icon={cilOptions} size="lg" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#!" onClick={() => setIsEdit(!isEdit)}>
                    Edit
                  </CDropdownItem>
                  <CDropdownItem
                    href="#!"
                    onClick={() => deleteHandler(task.id)}
                  >
                    Delete
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem
