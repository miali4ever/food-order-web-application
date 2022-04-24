import mealsImage from "../assets/meals.jpg";
import classes from "./NoAccount.module.css";
import { Fragment } from "react";

function NoAccount() {
  return (
    <Fragment>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>

      <div className={classes.summary}>
        <h2>Welcome To Happy Foodies!</h2>
        <h3>Login directly to choore our fresh food</h3>
        <h3>OR</h3>
        <h3> click Register to creact a new account</h3>
      </div>
    </Fragment>
  );
}

export default NoAccount;
