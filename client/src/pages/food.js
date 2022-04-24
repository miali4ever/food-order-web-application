import Meals from "../components/Meals/Meals";
import mealsImage from "../assets/meals.jpg";
import classes from "./foods.module.css";
import { Fragment } from "react";

function Food() {
  return (
    <Fragment>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
      <Meals />
    </Fragment>
  );
}

export default Food;
