import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({setIsLoggedIn}) => {

  const navigate = useNavigate()
  const handleLogOut =()=> {
    setIsLoggedIn(false)
    navigate("/")
  }
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
        <button className="btn" onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
