import { useState } from "react";
import { isValidEmail } from "../../utils";
import Input from "../input";
import Button from "../button";

const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const onEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && !isValidEmail(email)) {
      setEmailError("Email is not valid");
      return;
    }
    onSubmit(email);
  };

  return (
    <div className="forgot-password-form-wrapper authentication-form-wrapper">
      <form
        className="forgot-password-form authentication-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          id="email"
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email here"
          onChangeHandler={onEmailChange}
          className="auth-form__input"
          required={true}
          error={emailError}
          labelText="Email"
        />
        <Button type="submit" className="auth-form__button">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
