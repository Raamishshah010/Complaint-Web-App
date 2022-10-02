import React, { Fragment, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MainNavbar = () => {
  const [complaintUser, setComplaintUser] = useState(
    JSON.parse(sessionStorage.getItem("complaintuser"))
  );

  const navigate = useNavigate();

  const logoutHandler = () => {
    setComplaintUser(null);
    sessionStorage.removeItem("complaintuser");
    navigate("/");
  };

  return (
    <Fragment>
      {/* FIRST NAV */}
      <Navbar className="navbar-first">
        <Container>
          <Navbar.Text className="welcomeText">
            Welcome to Citizen-Complaints-System
          </Navbar.Text>
          <div className="texts" style={{ float: "right" }}>
            {complaintUser ? (
              <span>
                <Navbar.Text className="welcomeText">
                  {complaintUser.user.email.toLowerCase()}
                </Navbar.Text>
                <button onClick={logoutHandler} className="btn btn-danger">
                  Logout
                </button>
              </span>
            ) : (
              <Link to="/login" className="btn primary-button px-5">
                Login
              </Link>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Second Nav */}
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            citizen-Complaints
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {complaintUser && (
                <>
                  <Nav.Link
                    className="links"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    className="links"
                    onClick={() => navigate("/history")}
                  >
                    History
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav>
              <Nav.Link>
                <Link to="/complaints" className="complaintBtn">
                  Complaints
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default MainNavbar;
