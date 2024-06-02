import { createSlice } from "@reduxjs/toolkit"

const userProfile = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : {}

const initialState = {
  data: {
    email: userProfile.email || "",
  userId: userProfile.userId || "",
  username: userProfile.username || "",
  isLoggedIn: userProfile.isLoggedIn || "",
  }
}

const saveUserProfile = (state, action) => {
  const { user_id, username, email } = action.payload
  const userProfile = {
    userId: user_id,
    username: username,
    email: email,
    isLoggedIn: true,
  }
  state.data = { ...state.data, ...userProfile }

  localStorage.setItem("userProfile", JSON.stringify(userProfile))
}

export const authUser = createSlice({
  name: "authUserSlice",
  initialState,
  reducers: {
    saveUserProfile: saveUserProfile,
  },
})

export default authUser.reducer
