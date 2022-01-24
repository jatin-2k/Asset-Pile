import React, { useState, Fragment } from "react";
// import { FaGem, FaHeart, FaBars } from "react-icons/fa";
import { NavLink, withRouter } from "react-router-dom";
// import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { signout, isAuthenticated } from "../helper/index";
import "react-pro-sidebar/dist/css/styles.css";
const Navbar = () => {
  const [isNavToggled, setIsNavToggled] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand px-3" href="#">
            Navbar Brand
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarText"
          >
            <ul className="nav d-flex flex-wrap flex-lg-nowrap pb-3 py-lg-0 flex-column flex-lg-row align-items-start align-items-lg-center">
              {
                <li className="nav-item ms-2">
                  <NavLink
                    exact="true"
                    to="/"
                    className="nav-link primary-text  ps-0 ps-lg-3"
                  >
                    Home
                  </NavLink>
                </li>
              }
              {!isAuthenticated() && (
                <Fragment>
                  <li className="nav-item ms-2">
                    <NavLink
                      className="nav-link primary-text  ps-0 ps-lg-3"
                      to="/signup"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item ms-2">
                    <NavLink
                      className="nav-link primary-text  ps-0 ps-lg-3"
                      to="/signin"
                    >
                      Sign In
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
