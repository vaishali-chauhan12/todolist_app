import { createSlice } from "@reduxjs/toolkit"
import { fetchAllTasksByListId } from "../services/task"

const initialState = {
  data: {
    allTasks: [],
    pendingTasks: [],
    completedTasks: [],
  },
}
const saveAllTasks = (state, action) => {
  state.data.allTasks = []
  state.data.pendingTasks = []
  state.data.completedTasks = []
  state.data.allTasks = [...action.payload]
  updateTaskStore(state)
}

const updateTaskStore = (state) => {
  if (state.data.allTasks.length) {
    state.data.pendingTasks = state.data.allTasks.filter(
      (task) => task.status === 0,
    )
    state.data.completedTasks = state.data.allTasks.filter(
      (task) => task.status === 1,
    )
  }
}

export const taskCollection = createSlice({
  name: "taskCollection",
  initialState,
  reducers: {
    saveAllTasks: saveAllTasks,
    updateTaskCollection: updateTaskStore,
  },
})

export const fetchAllTasks = (listId) => {
  return async (dispatch) => {
    try {
      const allList = await fetchAllTasksByListId(listId)
      dispatch(taskCollection.actions.saveAllTasks(allList.resultObj))
    } catch (error) {
      console.error("listCollection", error)
    }
  }
}

export default taskCollection.reducer
