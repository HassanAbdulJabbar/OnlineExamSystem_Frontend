import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./Header.css";

const Header = () => {
  const UserRole = localStorage.getItem("userType");

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <b>LookScout</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {UserRole === "admin" && (
              <>
                <Nav.Link href="/admin" className="header-typography-style">
                  Add Users
                </Nav.Link>
                <Nav.Link
                  href="/examapproval"
                  className="header-typography-style"
                >
                  Approve Exams
                </Nav.Link>
                <Nav.Link href="/users" className="header-typography-style">
                  Current Users
                </Nav.Link>
                <Nav.Link
                  href="/examoutcomes"
                  className="header-typography-style"
                >
                  Student's exam outcomes
                </Nav.Link>
                <Nav.Link
                  href="/emailinvites"
                  className="header-typography-style"
                >
                  Email Invites
                </Nav.Link>
              </>
            )}

            {UserRole === "Teacher" && (
              <>
                <Nav.Link href="/examslist" className="header-typography-style">
                  Active Exams
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
