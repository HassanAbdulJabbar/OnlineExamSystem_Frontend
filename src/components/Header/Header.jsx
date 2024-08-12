import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const Header = () => {
  const UserRole = localStorage.getItem("userType");

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="ms-5">
          <b>LookScout</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {UserRole === "admin" && (
              <>
                <Nav.Link
                  href="/admin"
                  style={{ color: "white", marginLeft: "80px" }}
                >
                  Add Users
                </Nav.Link>
                <Nav.Link href="/examapproval" style={{ color: "white" }}>
                  Approve Exams
                </Nav.Link>
                <Nav.Link href="/users" style={{ color: "white" }}>
                  Current Users
                </Nav.Link>
                <Nav.Link href="/examoutcomes" style={{ color: "white" }}>
                  Student's exam outcomes
                </Nav.Link>
                <Nav.Link href="/emailinvites" style={{ color: "white" }}>
                  Email Invites
                </Nav.Link>
              </>
            )}

            {UserRole === "Teacher" && (
              <>
                <Nav.Link href="/examslist" style={{ color: "white" }}>
                  Active Exams
                </Nav.Link>
                <Nav.Link href="/approvalslist" style={{ color: "white" }}>
                  Exam Approval Status
                </Nav.Link>
                <Nav.Link
                  href="/teacher/create-exam"
                  style={{ color: "white" }}
                >
                  Create Exam
                </Nav.Link>
              </>
            )}

            {UserRole === "Student" && (
              <>
                <Nav.Link href="/examList" style={{ color: "white" }}>
                  Active Exams
                </Nav.Link>
                <Nav.Link href="/profile" style={{ color: "white" }}>
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
