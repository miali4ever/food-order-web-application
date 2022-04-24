// import React from "react";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import UserContext from "../../../UserAndCart/user-context";

// import { AuthContext } from "../../context/auth-context";
import classes from "./NavLinks.module.css";

const NavLinks = (props) => {
  const user = useContext(UserContext);
  const name = user.userName;

  return (
    <ul className={classes["navlinks"]}>
      {user.isLoggedIn && (
        <li>
          <NavLink to="/food" exact>
            Food
          </NavLink>
        </li>
      )}

      {!user.isLoggedIn && (
        <li>
          <NavLink to="/login" exact>
            Login
          </NavLink>
        </li>
      )}

      {!user.isLoggedIn && (
        <li>
          <NavLink to="/register" exact>
            Register
          </NavLink>
        </li>
      )}

      {user.isLoggedIn && (
        <li>
          <HeaderCartButton onClick={props.onShowCart} />
        </li>
      )}

      {user.isLoggedIn && (
        <li>
          <NavLink to={`/${user.userId}/orders`}>{name}'s Orders</NavLink>
        </li>
      )}

      {user.isLoggedIn && (
        <li>
          <button onClick={user.Logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
