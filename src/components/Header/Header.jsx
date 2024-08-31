import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Header.css";
import { LoggedUserRole, UserRole } from "../../services/userStateService";

const Header = () => {
  const onClickNavbarBrand = () => {
    if (LoggedUserRole === "admin") {
      return () => {
        window.location.href = "/welcome-admin";
      };
    } else if (LoggedUserRole === "Teacher") {
      return () => {
        window.location.href = "/welcome-teacher";
      };
    } else if (LoggedUserRole === "Student") {
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
                    <span className="material-icons">person_add</span>
                    Add Users
                  </span>
                  <span className="desktop-class">Add Users</span>
                </Nav.Link>
                <Nav.Link
                  href="/examapproval"
                  className="header-typography-style"
                >
                  <span className="header-icons">
                    <span className="material-icons">assignment_turned_in</span>
                    Approve Exams
                  </span>
                  <span className="desktop-class">Approve Exams</span>
                </Nav.Link>
                <Nav.Link href="/users" className="header-typography-style">
                  <span className="header-icons">
                    <span className="material-icons">person</span>Current Users
                  </span>
                  <span className="desktop-class">Current Users</span>
                </Nav.Link>
                <Nav.Link
                  href="/examoutcomes"
                  className="header-typography-style"
                >
                  <span className="header-icons">
                    <span className="material-icons">list_alt</span>Student's
                    exam outcome
                  </span>
                  <span className="desktop-class">Student's exam outcome</span>
                </Nav.Link>
                <Nav.Link
                  href="/emailinvites"
                  className="header-typography-style"
                >
                  <span className="header-icons">
                    <span className="material-icons">email</span>Email Invites
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
                    <span className="material-icons">assignment</span>Active
                    Exams
                  </span>
                  <span className="desktop-class">Active Exams</span>
                </Nav.Link>
                <Nav.Link
                  href="/approvalslist"
                  className="header-typography-style"
                >
                  <span className="header-icons">
                    <span className="material-icons">
                      <span className="material-symbols-outlined">
                        check_circle
                      </span>
                    </span>
                    Exam Approval Status Exams
                  </span>
                  <span className="desktop-class">Exam Approval Status</span>
                </Nav.Link>
                <Nav.Link
                  href="/teacher/create-exam"
                  className="header-typography-style"
                >
                  <span className="header-icons">
                    <span className="material-icons">
                      <span className="material-symbols-outlined">
                        edit_square
                      </span>
                    </span>
                    Create Exam
                  </span>
                  <span className="desktop-class">Create Exam</span>
                </Nav.Link>
                <hr className="hr hr-blurry divider" />
              </>
            )}

            {UserRole === "Student" && (
              <>
                <Nav.Link href="/examList" className="header-typography-style">
                  <span className="header-icons">
                    <span className="material-icons">
                      <span class="material-symbols-outlined">
                        format_list_bulleted
                      </span>
                    </span>
                    Active Exams
                  </span>
                  <span className="desktop-class">Active Exams</span>
                </Nav.Link>
                <Nav.Link href="/profile" className="header-typography-style">
                  <span className="header-icons">
                    <span className="material-icons">person</span>Student
                    Profile
                  </span>
                  <span className="desktop-class">Student Profile</span>
                </Nav.Link>
                <hr className="hr hr-blurry divider" />
              </>
            )}
          </Nav>
          <Link to="/">
            <button
              type="button"
              className="btn btn-danger text-light me-5"
              onClick={() => {
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("userType");
                localStorage.removeItem("userRole");
              }}
            >
              <span className="logout-icon">
                <span className="material-icons">logout</span>Logout
              </span>
            </button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
