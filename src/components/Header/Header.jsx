import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./Header.css";

const Header = () => {
  const UserRole = localStorage.getItem("userType");

  const onClickNavbarBrand = () => {
    if (UserRole === "admin") {
      return () => {
        window.location.href = "/welcome-admin";
      };
    } else if (UserRole === "Teacher") {
      return () => {
        window.location.href = "/welcome-teacher";
      };
    } else if (UserRole === "Student") {
      return () => {
        window.location.href = "/welcome-student";
      };
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={onClickNavbarBrand()} className="nav-logo">
          <b>Dev Geeks</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {UserRole === "admin" && (
              <>
                <Nav.Link href="/admin" className="header-typography-style">
                  <span className="header-icons">
                    <span class="material-icons">person_add</span>Add Users
                  </span>
                  <span className="desktop-class">Add Users</span>
                </Nav.Link>
                <Nav.Link
                  href="/examapproval"
                  className="header-typography-style"
                >
                  <span className="header-icons">
                    <span class="material-icons">assignment_turned_in</span>
                    Approve Exams
                  </span>
                  <span className="desktop-class">Approve Exams</span>
                </Nav.Link>
                <Nav.Link href="/users" className="header-typography-style">
                  <span className="header-icons">
                    <span class="material-icons">person</span>Current Users
                  </span>
                  <span className="desktop-class">Current Users</span>
                </Nav.Link>
                <Nav.Link
                  href="/examoutcomes"
                  className="header-typography-style"
                >
                  <span className="header-icons">
                    <span class="material-icons">list_alt</span>Student's exam
                    outcome
                  </span>
                  <span className="desktop-class">Student's exam outcome</span>
                </Nav.Link>
                <Nav.Link
                  href="/emailinvites"
                  className="header-typography-style"
                >
                  <span className="header-icons">
                    <span class="material-icons">email</span>Email Invites
                  </span>
                  <span className="desktop-class">Email Invites</span>
                </Nav.Link>
                <hr className="hr hr-blurry divider" />
              </>
            )}

            {UserRole === "Teacher" && (
              <>
                <Nav.Link href="/examslist" className="header-typography-style">
                  <span className="header-icons">
                    <span class="material-icons">assignment</span>Active Exams
                  </span>
                  <span className="desktop-class">Active Exams</span>
                </Nav.Link>
                <Nav.Link
                  href="/approvalslist"
                  className="header-typography-style"
                >
                  Exam Approval Status
                </Nav.Link>
                <Nav.Link
                  href="/teacher/create-exam"
                  className="header-typography-style"
                >
                  Create Exam
                </Nav.Link>
                <hr className="hr hr-blurry divider" />
              </>
            )}

            {UserRole === "Student" && (
              <>
                <Nav.Link href="/examList" className="header-typography-style">
                  Active Exams
                </Nav.Link>
                <Nav.Link href="/profile" className="header-typography-style">
                  Student Profile
                </Nav.Link>
                <hr className="hr hr-blurry divider" />
              </>
            )}
          </Nav>
          <Link to="/">
            <button
              type="button"
              className="btn btn-danger text-light me-5"
              onClick={() => localStorage.removeItem("Token")}
            >
              Sign Out
            </button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
