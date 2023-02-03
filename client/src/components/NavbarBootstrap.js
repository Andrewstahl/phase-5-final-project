import React from "react";
// import "../assets/navbar.css"
import "../assets/index.css";
import { useSystemMode, useSystemModeUpdate } from "../SystemModeContext";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavbarBootstrap({
  onLogoutClick,
  siteMode,
  onSiteToggle,
}) {
  const systemMode = useSystemMode();
  const toggleSystemMode = useSystemModeUpdate();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/postings">
            <Nav.Link>Postings</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/search">
            <Nav.Link>Search</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/conversations">
            <Nav.Link>Conversations</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/projects">
            <Nav.Link>Projects</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      <nav class="navbar bg-body-tertiary">
        <form class="container-fluid justify-content-start">
          {/* <button class="btn btn-outline-success me-3" type="button" onClick={toggleSystemMode}> */}
          <button class={`btn navbar-colors-${systemMode.toLowerCase()} me-3`} type="button" onClick={toggleSystemMode}>
            Switch to {systemMode === "Freelancer" ? "Buying" : "Freelancing"}
          </button>
          <button
            class="btn btn-outline-danger btn-outline-secondary"
            type="button"
          >
            Logout
          </button>
        </form>
      </nav>
    </Navbar>
  );
}