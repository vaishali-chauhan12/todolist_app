import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/login-form";
import SignUpForm from "../../components/sign-up-form";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { authUser } from "../../store/user-profile";
import { signUpUser, authenticateUser } from "../../services/auth";
import { toast } from "react-toastify";

const Authentication = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.indexOf("signup") !== -1 ? 1 : 2
  );
  const info = useSelector((state) => state.authUser.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setloginError] = useState(false);

  if (info.isLoggedIn) {
    return <Navigate to="/" />;
  }

  const signUpHandler = async (signUpData) => {
    try {
      const loginInfo = await signUpUser(signUpData);
      loginInfo.resultObj.user_id &&
        dispatch(authUser.actions.saveUserProfile(loginInfo.resultObj));
      navigate("/");
    } catch (error) {
      console.error("catch", error);
    }
  };

  const loginHandler = async (loginData) => {
    try {
      const loginInfo = await authenticateUser(loginData);
      if (loginInfo.code == 200) {
        loginInfo.resultObj.user_id &&
          dispatch(authUser.actions.saveUserProfile(loginInfo.resultObj));
        navigate("/");
      } else {
        toast.error(loginInfo.message, {
          autoClose: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      setloginError(true);
      console.error("catch", error);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-nav-tabs">
        <div
          className={`auth-nav-tab ${activeTab === 1 ? "auth-nav-tab_active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          SIGN UP
        </div>
        <div
          className={`auth-nav-tab ${activeTab === 2 ? "auth-nav-tab_active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          SIGN IN
        </div>
      </div>
      <div className="auth-form">
        {activeTab === 1 && (
          <div>
            <SignUpForm onSubmit={signUpHandler} />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <LoginForm onSubmit={loginHandler} loginError={loginError} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
