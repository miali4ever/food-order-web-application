import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import UserContext from "./UserAndCart/user-context";
import { CartContext } from "./UserAndCart/CartContext";
import { UserAccount } from "./UserAndCart/UserAccount";

// We import all the components we need in our app
import Food from "./pages/food";
import Orders from "./pages/orders";
import Login from "./pages/login";
import Register from "./pages/register";
import NoAccount from "./pages/NoAccount";
import MainNavigation from "./components/Layout/MainNavigation";
import Cart from "../src/components/Cart/Cart";

const App = () => {
  // get CartContext and pass it ro cart
  const cart = CartContext();

  const { isLoggedIn, userId, userName, userEmail, login, logout } =
    UserAccount();
  // console.log("app.js page");
  // console.log(userId);
  // console.log(userName);
  // console.log(userEmail);

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Food />} />
        <Route exact path="/food" element={<Food />} />
        <Route exact path="/:userId/orders" element={<Orders />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<NoAccount />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        Login: login,
        Logout: logout,
        cartContext: cart,
      }}
    >
      {cartIsShown && <Cart onClose={hideCartHandler} />}

      <MainNavigation onShowCart={showCartHandler} />

      <main>{routes}</main>
    </UserContext.Provider>
  );
};

export default App;
