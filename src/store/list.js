import { createSlice } from "@reduxjs/toolkit"
import { fetchAllList } from "../services/list"

const initialState = {
  data: {
    allLists: [],
    defaultList: {}
  },
}

const saveListStore = (state, action) => {
  state.data.allLists = action.payload.filter(list => list.title.toLowerCase() !== "home")
  state.data.defaultList = action.payload.filter(list => list.title.toLowerCase() === "home")[0]
}

const updateListStore = (state, action) => {
  state.data.allLists = action.payload.filter(list => list.title.toLowerCase() !== "home")
}

export const listCollection = createSlice({
  name: "listCollection",
  initialState,
  reducers: {
    saveListStore: saveListStore,
    updateListStore: updateListStore
  },
})

export const updateListCollection = (payload) => {
  return async (dispatch) => {
    try {
      const allList = await fetchAllList(payload)
      dispatch(listCollection.actions.saveListStore(allList.resultObj))
    } catch (error) {
      console.error("listCollection", error)
    }
  }
}

export default listCollection.reducer
