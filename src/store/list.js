import { createSlice } from "@reduxjs/toolkit"
import { fetchAllList } from "../services/list"

const initialState = {
  data: {
    allLists: [],
  },
}

const updateListStore = (state, action) => {
  state.data.allLists = [...action.payload]
}

export const listCollection = createSlice({
  name: "listCollection",
  initialState,
  reducers: {
    updateListStore: updateListStore,
  },
})

export const updateListCollection = (payload) => {
  return async (dispatch) => {
    try {
      const allList = await fetchAllList(payload)
      dispatch(listCollection.actions.updateListStore(allList.resultObj))
    } catch (error) {
      console.error("listCollection", error)
    }
  }
}

export default listCollection.reducer
