import { useState } from "react"
import TaskForm from "../../task-form"
import TaskCheckbox from "../task-checkbox"
import EditOptions from "../../edit-options"

const TaskItem = ({
  task,
  updateTaskStatus,
  updateTaskDetail,
  deleteHandler,
}) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <li className="task-item-wrapper">
      {isEdit ? (
        <TaskForm
          task={task}
          submitHandler={updateTaskDetail}
          setNewTask={setIsEdit}
          isVisible={isEdit}
        />
      ) : (
        <div className="task-item">
          <TaskCheckbox updateTaskStatus={updateTaskStatus} task={task} />
          <div className="task-details">
            <div
              className="task-details__title"
              onClick={() => setIsEdit(true)}
            >
              {task.title}
            </div>
            <div className="task-details__options">
            <EditOptions className="task-options-dropdown-toggle" onEdit={setIsEdit} onDelete={deleteHandler} id={task?.id} iconSize="lg" />
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

export default TaskItem
