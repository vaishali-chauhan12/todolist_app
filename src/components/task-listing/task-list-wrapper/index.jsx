import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  saveTask,
  markTaskComplete,
  updateTask,
  deleteTask,
} from "../../../services/task";
import { taskCollection } from "../../../store/task";
import TaskForm from "../../task-form";
import TaskItem from "../task-item";
import Button from "../../button";

const TaskListWrapper = (props) => {
  const [isNewTask, setNewTask] = useState(false);
  const dispatch = useDispatch();
  const { allTasks, currrentTaskList, listId } = props;

  const createTask = useCallback(
    async (formdata) => {
      formdata.listId = listId;
      try {
        const { resultObj } = await saveTask(formdata);
        const tasks = [resultObj, ...allTasks];
        dispatch(taskCollection.actions.saveAllTasks(tasks));
      } catch (error) {
        console.error("createTask", error);
      }
    },
    [allTasks]
  );

  const filterTasks = useCallback(
    (taskId) => {
      return allTasks.filter((task) => task.id !== taskId);
    },
    [allTasks]
  );

  const updateTaskStatus = useCallback(
    async (task) => {
      const payload = { ...task };
      payload.status = task.status ? 0 : 1;
      try {
        await markTaskComplete(payload);
        const filteredTask = filterTasks(payload.id);
        const tasks = [payload, ...filteredTask];
        dispatch(taskCollection.actions.saveAllTasks(tasks));
      } catch (error) {
        console.error("updateTaskStatus", error);
      }
    },
    [filterTasks]
  );

  const updateTaskDetail = useCallback(
    async (formdata) => {
      try {
        await updateTask(formdata);
        const filteredTask = filterTasks(formdata.id);
        const tasks = [formdata, ...filteredTask];
        dispatch(taskCollection.actions.saveAllTasks(tasks));
      } catch (error) {
        console.error("updateTaskDetail", error);
      }
    },
    [filterTasks]
  );

  const onDelete = useCallback(
    async (taskId) => {
      try {
        await deleteTask(taskId);
        const filteredTask = filterTasks(taskId);
        dispatch(taskCollection.actions.saveAllTasks(filteredTask));
      } catch (error) {
        console.error("onDelete", error);
      }
    },
    [filterTasks]
  );

  return (
    <>
      {currrentTaskList.length > 0 && (
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
      )}
      {isNewTask && (
        <TaskForm
          submitHandler={createTask}
          setNewTask={setNewTask}
          isVisible={isNewTask}
        />
      )}
      {currrentTaskList.length > 0 && (
        <ul className="task-listing">
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
        </ul>
      )}
      {!isNewTask && currrentTaskList.length === 0 && (
        <div className="fallback-section">
          <img src="../../../assets/images/no_list.jpg" />
          <div>
            <a
              className="attribution-text"
              href="https://www.freepik.com/free-vector/hand-drawn-checklist-background_3903465.htm#fromView=image_search_similar&page=2&position=48&uuid=13884f2c-a3f6-437b-9b27-ac831fee40cd"
            >
              Image by freepik
            </a>
          </div>
          <div className="fallback-text">
            <div className="fallback-text__line1">No tasks yet</div>
            <div className="fallback-text__line2">
              Add your todos and keep track of them
            </div>
          </div>
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
        </div>
      )}
    </>
  );
};

export default TaskListWrapper;
