import React, { Fragment, useContext } from "react";
import Card from "../components/UI/Card";
import { useNavigate } from "react-router-dom";
import useInput from "../components/hooks/user-input";
import classes from "./login.module.css";
import UserContext from "../UserAndCart/user-context";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const Login = () => {
  const user = useContext(UserContext);

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

  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    // navigate("/");

    // console.log("Submitted!");
    // console.log(passwordValue, emailValue);

    //test area

    const singleUser = {
      email: emailValue,
      password: passwordValue,
    };

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    resetEmail();
    resetPassword();

    const responseData = await response.json();

    user.Login(
      responseData.userId,
      responseData.userName,
      responseData.userEmail
    );

    navigate("/");
  };

  return (
    <Fragment>
      <Card className={classes.authentication}>
        <form className={classes.form} onSubmit={submitHandler}>
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
              LogIn
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default Login;
