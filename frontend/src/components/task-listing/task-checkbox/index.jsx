import { useState } from "react"
import CIcon from "@coreui/icons-react"
import { cilCircle, cilCheckAlt } from "@coreui/icons"

const TaskCheckbox = ({updateTaskStatus, task}) => {
  const [onRadioHover, setRadioHover] = useState(false);

  return (
    <div
      className="task-radio-button-wrapper"
      onMouseEnter={() => setRadioHover(true)}
      onMouseLeave={() => setRadioHover(false)}
      role="img"
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
          title="Mark Pending"
          onClick={() => updateTaskStatus(task)}
        />
      )}
    </div>
  );
};

export default TaskCheckbox