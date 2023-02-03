import React from "react";
import { NavLink } from "react-router-dom";
// import "../assets/navbar.css"
import "../assets/index.css"
import { useSystemMode, useSystemModeUpdate } from "../SystemModeContext";

function NavBar({ onLogoutClick, siteMode, onSiteToggle }) {
  const systemMode = useSystemMode()
  const toggleSystemMode = useSystemModeUpdate()

  const linkStyles = {
    width: "100%",
    height: "10%",
    padding: ".5em",
    fontSize: "2vw",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    verticalAlign: "center",
  };
  
  const linkStylesActive = {
    ...linkStyles,
    borderAround: "5px grey",
  };

  const navLinkStyles = {
    display: "flex",
    margin: "10px 5px",
    borderTop: "10px white",
    // borderBottom: "1px solid purple",
    padding: "0px 300px",
  };

  return (
    <div className="navbar-div">
      <div className={`navbar-links colors-${systemMode.toLowerCase()}`} style={{ ...navLinkStyles }}>
        <NavLink
          // to={`/postings/${siteMode.toLowerCase()}`}
          to="/postings"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Postings
        </NavLink>
        <NavLink
          to="/search"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Search
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
          to="/profile"
          exact
          style={({ isActive }) => (isActive ? linkStylesActive : linkStyles)}
        >
          Profile
        </NavLink>
      </div>
      <button className={`system-toggle-button opposite-colors-${systemMode}`} onClick={toggleSystemMode}>
        Switch to {systemMode === "Freelancer" ? "Buying" : "Freelancing"}
      </button>
      <button className={`logout-button opposite-colors-${systemMode}`} onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;