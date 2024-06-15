import { useState } from "react";
import Input from "../input";
import Button from "../button";
import { isValidEmail } from "../../utils";
import "./index.scss";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = ({ onSubmit, loginError }) => {
  const [loginState, setLoginState] = useState(initialState);
  const [error, setError] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginState((previousLoginState) => ({
      ...previousLoginState,
      [name]: value,
    }));
    validateField(name)
  };

  const validateField = (fieldName) => {
    let isValidField = true;
    if (loginState[fieldName].trim() === "") {
      isValidField = false;
      setError((previousError) => ({
        ...previousError,
        [fieldName]: "* Field is required",
      }));
      return;
    } else {
      setError((previousError) => ({
        ...previousError,
        [fieldName]: "",
      }));
    }

    if (
      fieldName === "email" &&
      loginState.email &&
      !isValidEmail(loginState.email)
    ) {
      isValidField = false;
      setError((previousError) => ({
        ...previousError,
        [fieldName]: "* Invalid email format",
      }));
    }
    return isValidField;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmailValid = validateField("email");
    const isPwdValid = validateField("password");

    if (isEmailValid && isPwdValid) {
      onSubmit(loginState);
    } else {
      console.error("error", error);
    }
  };

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <Input
          id="email"
          type="text"
          name="email"
          value={loginState.email}
          placeholder="Enter your email here"
          onChangeHandler={handleInputChange}
          className="login-form__input"
          required={true}
          error={error.email}
          labelText="Email"
        />
        <Input
          id="password"
          type="password"
          name="password"
          value={loginState.password}
          placeholder="Enter your password here"
          onChangeHandler={handleInputChange}
          className="login-form__input"
          required={true}
          error={error.password}
          labelText="Password"
        />
        {loginError && <div class="form__error">Email or password is incorrect</div>}
        <Button type="submit" className="login-form__button">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
