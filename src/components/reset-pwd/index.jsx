import { useState } from "react";
import { PASSWORD_MIN_LENGTH } from "../../constants";
import Input from "../input";
import Button from "../button";

const initialState = {
  password: "",
  confirmPassword: "",
};

const ResetPasswordForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const inputOnBlur = (event) => {
    const { name } = event.target;
    validateField(name);
  };

  const validateField = (fieldName) => {
    let isValidField = true;
    if (formData[fieldName].trim() === "") {
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

    if (formData.password.length < PASSWORD_MIN_LENGTH) {
      isValidField = false;
      setError((previousError) => ({
        ...previousError,
        [fieldName]: "* Password must be atleast 6 characters long",
      }));
    }

    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      isValidField = false;
      setError((previousError) => ({
        ...previousError,
        confirmPassword: "* Passwords didn’t match",
      }));
    } else if (fieldName === "confirmPassword" && !formData.confirmPassword) {
      setError((previousError) => ({
        ...previousError,
        confirmPassword: "* Field is required",
      }));
    } else {
      setError((previousError) => ({
        ...previousError,
        confirmPassword: "",
      }));
    }
    return isValidField;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isPwdValid = validateField("password");
    isPwdValid && onSubmit(formData);
  };

  return (
    <div className="forgot-password-form-wrapper authentication-form-wrapper">
      <form
        className="forgot-password-form authentication-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChangeHandler={handleInputChange}
          inputOnBlur={inputOnBlur}
          className="auth-form__input"
          required={true}
          error={error.password}
          labelText="Password"
        />
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChangeHandler={handleInputChange}
          inputOnBlur={inputOnBlur}
          className="auth-form__input"
          required={true}
          error={error.confirmPassword}
          labelText="Confirm Password"
        />
        <Button type="submit" className="auth-form__button">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
