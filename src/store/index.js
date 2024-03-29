import { configureStore } from "@reduxjs/toolkit"
import authUserReducer from "./user-profile"
import listCollectionReducer from "./list"
import taskCollectionReducer from "./task"

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    listCollection: listCollectionReducer,
    taskCollection: taskCollectionReducer,
  },
})
