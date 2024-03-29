import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllTasks } from "../../store/task"
import { CTabContent, CTabPane } from "@coreui/react"
import TaskListHeader from "./task-list-header"
import TaskListWrapper from "./task-list-wrapper"
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

  console.error("allTasks", allTasks)

  return (
    <div className="task-listing-main-wrapper">
      <TaskListHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      <CTabContent>
        <CTabPane
          role="tabpanel"
          aria-labelledby="all "
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
          aria-labelledby="profile-tab"
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
          aria-labelledby="contact-tab"
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
