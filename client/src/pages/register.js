import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import Card from "../components/UI/Card";

import useInput from "../components/hooks/user-input";

import classes from "./register.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const Register = () => {
  // const auth = useContext(UserContext);

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  let navigate = useNavigate();

  if (usernameIsValid && passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const singleUser = {
      name: usernameValue,
      email: emailValue,
      password: passwordValue,
    };

    try {
      await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(singleUser),
      });

      // auth.login(response.userId, response.email);
    } catch (error) {
      window.alert(error);
      return;
    }

    navigate("/login");

    resetUsername();
    resetEmail();
    resetPassword();
  };

  // const routeChange = () => {
  //   if (formIsValid) {
  //     let path = `/login`;
  //     navigate(path);
  //   }
  // };

  return (
    <Fragment>
      <Card className={classes.authentication}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              value={usernameValue}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
            />
            {usernameHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid username.
              </p>
            )}
          </div>

          <div className={classes.control}>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid E-mail address.
              </p>
            )}
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="psaaword"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className={classes["error-text"]}>
                Please enter a valid password.
              </p>
            )}
          </div>

          <div className={classes.actions}>
            <button className="btn" disabled={!formIsValid}>
              Register
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default Register;
