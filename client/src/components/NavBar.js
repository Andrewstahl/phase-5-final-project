import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/NavBar.css"

const linkStyles = {
  width: "100%",
  height: "10%",
  padding: ".5em",
  fontSize: "25px",
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  alignItems: "center",
  verticalAlign: "center",
};

const linkStylesActive = {
  ...linkStyles,
  background: "grey",
};

const navLinkStyles = {
  display: "flex",
  borderTop: "10px white",
  borderBottom: "1px solid purple",
  backgroundColor: "rgb(84, 77, 184)",
  padding: "0px 300px",
};

function NavBar({ setUser, onLogoutClick }) {

  return (
    <div className="navbar-div">
      <div style={{ ...navLinkStyles }}>
        <NavLink
          to="/postings"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Your Postings
        </NavLink>
        <NavLink
          to="/conversations"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Convos
        </NavLink>
        <NavLink
          to="/projects"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Projects
        </NavLink>
        <NavLink
          to="/search"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Search
        </NavLink>
        <NavLink
          to="/profile"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Profile
        </NavLink>
      </div>
      <button className="system-toggle-button">
        Switch to Selling
      </button>
      <button className="logout-button" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;