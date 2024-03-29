import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllTasks } from "../../store/task"
import { CTabContent, CTabPane } from "@coreui/react"
import TaskListHeader from "./task-list-header"
import TaskListWrapper from "./task-list-wrapper"
import { TASK_STATUS_NAV_MENU } from "..//../constants"
import "./index.scss"

const TaskListing = ({ listId }) => {
  const [activeTab, setActiveTab] = useState(1)
  const { allTasks, pendingTasks, completedTasks } = useSelector(
    (state) => state.taskCollection.data,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (listId) {
      dispatch(fetchAllTasks(listId))
    }
  }, [listId])

  return (
    <div className="task-listing-main-wrapper">
      <TaskListHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      <CTabContent>
        <CTabPane
          role="tabpanel"
          aria-labelledby={TASK_STATUS_NAV_MENU.ALL}
          visible={activeTab === 1}
        >
          <TaskListWrapper
            allTasks={allTasks}
            currrentTaskList={allTasks}
            listId={listId}
          />
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby={TASK_STATUS_NAV_MENU.PENDING}
          visible={activeTab === 2}
        >
          <TaskListWrapper
            allTasks={allTasks}
            currrentTaskList={pendingTasks}
            listId={listId}
          />
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby={TASK_STATUS_NAV_MENU.COMPLETED}
          visible={activeTab === 3}
        >
          <TaskListWrapper
            allTasks={allTasks}
            currrentTaskList={completedTasks}
            listId={listId}
          />
        </CTabPane>
      </CTabContent>
    </div>
  )
}

export default TaskListing
