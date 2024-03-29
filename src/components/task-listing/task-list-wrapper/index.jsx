import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  saveTask,
  markTaskComplete,
  updateTask,
  deleteTask,
} from "../../../services/task"
import { taskCollection } from "../../../store/task"
import TaskForm from "../../task-form"
import TaskItem from "../task-item"
import Button from "../../button"

const TaskListWrapper = (props) => {
  const [isNewTask, setNewTask] = useState(false)
  const dispatch = useDispatch()
  const { allTasks, currrentTaskList, listId } = props

  const createTask = useCallback(
    async (formdata) => {
      formdata.listId = listId
      try {
        const { resultObj } = await saveTask(formdata)
        const tasks = [resultObj, ...allTasks]
        dispatch(taskCollection.actions.saveAllTasks(tasks))
      } catch (error) {
        console.error("createTask", error)
      }
    },
    [allTasks],
  )

  const filterTasks = useCallback(
    (taskId) => {
      return allTasks.filter((task) => task.id !== taskId)
    },
    [allTasks],
  )

  const updateTaskStatus = useCallback(
    async (task) => {
      const payload = { ...task }
      payload.status = task.status ? 0 : 1
      try {
        await markTaskComplete(payload)
        const filteredTask = filterTasks(payload.id)
        const tasks = [payload, ...filteredTask]
        dispatch(taskCollection.actions.saveAllTasks(tasks))
      } catch (error) {
        console.error("updateTaskStatus", error)
      }
    },
    [filterTasks],
  )

  const updateTaskDetail = useCallback(
    async (formdata) => {
      try {
        await updateTask(formdata)
        const filteredTask = filterTasks(formdata.id)
        const tasks = [formdata, ...filteredTask]
        dispatch(taskCollection.actions.saveAllTasks(tasks))
      } catch (error) {
        console.error("updateTaskDetail", error)
      }
    },
    [filterTasks],
  )

  const onDelete = useCallback(
    async (taskId) => {
      try {
        await deleteTask(taskId)
        const filteredTask = filterTasks(taskId)
        dispatch(taskCollection.actions.saveAllTasks(filteredTask))
      } catch (error) {
        console.error("onDelete", error)
      }
    },
    [filterTasks],
  )

  return (
    <>
      <div className="create-button-wrapper">
        <Button
          type="button"
          color="success"
          variant="outline"
          clickHandler={() => setNewTask(true)}
        >
          Add task
        </Button>
      </div>
      {isNewTask && (
        <TaskForm
          submitHandler={createTask}
          setNewTask={setNewTask}
          isVisible={isNewTask}
        />
      )}
      <div className="task-listing">
        {currrentTaskList?.map((task) => (
          <TaskItem
            task={task}
            listId={listId}
            key={`task_${task.id}`}
            updateTaskDetail={updateTaskDetail}
            updateTaskStatus={updateTaskStatus}
            deleteHandler={onDelete}
          />
        ))}
      </div>
    </>
  )
}

export default TaskListWrapper
