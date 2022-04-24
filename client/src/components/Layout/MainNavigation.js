import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./Navigation/MainHeader";
import NavLinks from "./Navigation/NavLinks";
import SideDrawer from "./Navigation/SideDrawer";
import Backdrop from "../UI/Backdrop";
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {/*This is triggerd when mobile page setting was clicked */}
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className={classes["main-navigation__drawer-nav"]}>
          <NavLinks onShowCart={props.onShowCart} />
        </nav>
      </SideDrawer>

      <MainHeader>
        {/* Header in mobile page settings*/}
        <button
          className={classes["main-navigation__menu-btn"]}
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Header in webpage settings*/}
        <h1 className={classes["main-navigation__title"]}>
          <Link to="/">HappyFoodies</Link>
        </h1>

        <nav className={classes["main-navigation__header-nav"]}>
          <NavLinks onShowCart={props.onShowCart} />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
