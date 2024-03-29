import React from "react"
import { Route } from "react-router"
import Login from "../features/login"

function PrivateRoute({ Component, ...rest }) {
  // const isLoggedIn = localStorage.getItem("IS_AUTHENTICATED")

  return <Route {...rest} element={isLoggedIn ? <component /> : <Login />} />
}

export default PrivateRoute
