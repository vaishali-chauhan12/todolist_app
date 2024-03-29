import { Route, Routes } from "react-router"
// import PrivateRoute from "./privateRoute"
import ROUTE_CONSTANTS from "./route-constant"
import Login from "../features/login"
import SignUp from "../features/sign-up"
import Home from "../features/home"
import ListDetails from "../features/list-details"

const RoutesSwitch = () => {
  return (
    <Routes>
      <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />}></Route>
      <Route path={ROUTE_CONSTANTS.SIGN_UP} element={<SignUp />}></Route>
      <Route path={ROUTE_CONSTANTS.HOME} element={<Home />}></Route>
      <Route path={ROUTE_CONSTANTS.LIST} element={<ListDetails />}></Route>
      {/* <Route
        path={ROUTE_CONSTANTS.HOME}
        element={isLoggedIn ? <Home /> : <Login />} */}
      {/* /> */}
    </Routes>
  )
}

export default RoutesSwitch
