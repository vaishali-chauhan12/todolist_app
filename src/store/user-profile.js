import { createSlice } from "@reduxjs/toolkit"
import { authenticateUser } from "../services/auth"

const userProfile = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : {}

const initialState = {
  email: userProfile.email || "",
  userId: userProfile.userId || "",
  username: userProfile.username || "",
  isLoggedIn: userProfile.isLoggedIn || "",
}

const saveUserProfile = (state, action) => {
  const { user_id, username, email } = action.payload
  const userProfile = {
    userId: user_id,
    username: username,
    email: email,
    isLoggedIn: true,
  }
  state = { ...state, userProfile }

  localStorage.setItem("userProfile", JSON.stringify(userProfile))
}

export const authUser = createSlice({
  name: "authUserSlice",
  initialState,
  reducers: {
    saveUserProfile: saveUserProfile,
  },
})

export const loginUser = (payload) => {
  return async (dispatch) => {
    try {
      const loginInfo = await authenticateUser(payload)
      loginInfo.resultObj.user_id &&
        dispatch(authUser.actions.saveUserProfile(loginInfo.resultObj))
      //   toast.success("")
    } catch (error) {
      console.error("authUser", error)
    }
  }
}

export default authUser.reducer
