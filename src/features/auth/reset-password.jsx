import { toast } from "react-toastify";
import ResetPasswordForm from "../../components/reset-pwd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/auth";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const submitHandler = async (formData) => {
    try {
      const payload = {
        userId,
        token,
        ...formData,
      };
      const response = await resetPassword(payload);
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
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.error("catch", error);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <div className="auth-form-label">Reset Password</div>
        <ResetPasswordForm onSubmit={submitHandler} />
      </div>
    </div>
  );
};

export default ResetPassword;
