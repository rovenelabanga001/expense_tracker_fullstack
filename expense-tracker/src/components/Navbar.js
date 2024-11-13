import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="navbar-button-container">
        <button className="btn">Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
