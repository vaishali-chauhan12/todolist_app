import Header from "../header";
import "./index.scss";

const AuthWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <div className="auth-wrapper">{children}</div>
    </>
  );
};

export default AuthWrapper;
