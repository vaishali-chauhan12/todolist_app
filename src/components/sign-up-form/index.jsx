import { useState } from "react";
import Input from "../input";
import Button from "../button";
import { isValidEmail } from "../../utils";
import { PASSWORD_MIN_LENGTH } from "../../constants";
import "./index.scss"

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ onSubmit }) => {
  const [loginState, setLoginState] = useState(initialState);
  const [error, setError] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginState((previousLoginState) => ({
      ...previousLoginState,
      [name]: value,
    }));
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

    if (
      fieldName === "password" &&
      loginState.password.length < PASSWORD_MIN_LENGTH
    ) {
      isValidField = false;
      setError((previousError) => ({
        ...previousError,
        [fieldName]: "* Password must be atleast 6 characters long",
      }));
    }

    if (
      fieldName === "password" &&
      loginState.password !== loginState.confirmPassword
    ) {
      isValidField = false;
      setError((previousError) => ({
        ...previousError,
        confirmPassword: "* Passwords didn’t match",
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
    <div className="sign-up-form-wrapper">
      <form className="sign-up-form" onSubmit={handleSubmit} noValidate>
        <Input
          id="username"
          type="text"
          name="username"
          value={loginState.username}
          placeholder="Enter your username here"
          onChangeHandler={handleInputChange}
          className="login-form__input"
          required={true}
          error={error.username}
          labelText="Username"
        />
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
          placeholder="Password"
          onChangeHandler={handleInputChange}
          className="login-form__input"
          required={true}
          error={error.password}
          labelText="Password"
        />
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={loginState.confirmPassword}
          placeholder="Confirm Password"
          onChangeHandler={handleInputChange}
          className="login-form__input"
          required={true}
          error={error.password}
          labelText="Confirm Password"
        />
        <Button type="submit" className="login-form__button">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
