import { toast } from "react-toastify";
import ForgotPasswordForm from "../../components/forgot-pwd";
import { forgotPassword } from "../../services/auth";

const ForgotPassword = () => {
  const submitHandler = async (email) => {
    try {
      const response = await forgotPassword({ email });
      const responseMessage = response.message;
      if (response.code != 200) {
        toast.error(responseMessage, {
          autoClose: 5000,
          position: "top-right",
        });
      } else {
        toast.success(responseMessage, {
          autoClose: 5000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("catch", error);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <div className="auth-form-label">Forgot Password</div>
        <ForgotPasswordForm onSubmit={submitHandler} />
      </div>
    </div>
  );
};

export default ForgotPassword;
