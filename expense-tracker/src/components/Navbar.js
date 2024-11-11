import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav>
        <a className="nav-link">Home</a>
        <a className="nav-link">Transactions</a>
      </nav>
      <div className="navbar-button-container">
        <button className="btn">Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
