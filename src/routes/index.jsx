import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";
// import PrivateRoute from "./privateRoute"
import ROUTE_CONSTANTS from "./route-constant";
import Authentication from "../features/auth";
import ForgotPassword from "../features/auth/forgot-password";
import ResetPassword from "../features/auth/reset-password";
import Home from "../features/home";
import ListDetails from "../features/list-details";

const RoutesSwitch = () => {
  const isLoggedIn = useSelector((state) => state.authUser.data.isLoggedIn);
  return (
    <Routes>
      <Route
        path={ROUTE_CONSTANTS.HOME}
        element={isLoggedIn ? <Home /> : <Authentication />}
      />
      <Route path={ROUTE_CONSTANTS.LOGIN} element={<Authentication />}></Route>
      <Route
        path={ROUTE_CONSTANTS.SIGN_UP}
        element={<Authentication />}
      ></Route>
      <Route path={ROUTE_CONSTANTS.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTE_CONSTANTS.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTE_CONSTANTS.HOME} element={<Home />}></Route>
      <Route path={ROUTE_CONSTANTS.LIST} element={<ListDetails />}></Route>
    </Routes>
  );
};

export default RoutesSwitch;
