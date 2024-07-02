import React from "react";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

const Header = () => {
  const UserRole = localStorage.getItem("userType");

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <h5 className="navbar-brand ms-5">
          <b>LookScout</b>
        </h5>
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
              <Nav.Link href="/teacher/create-exam" style={{ color: "white" }}>
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
        ;
        <Link to="/">
          <button
            type="button"
            className="btn btn-danger text-light me-5"
            onClick={() => localStorage.removeItem("Token")}
          >
            Sign Out
          </button>
        </Link>
      </nav>
    </>
  );
};

export default Header;
