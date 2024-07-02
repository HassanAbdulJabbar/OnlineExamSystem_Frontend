import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const WelcomeComponent = () => {
  const UserRole = localStorage.getItem("userType");

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col className="text-center mt-5 pt-5 mb-5 pt-5">
            <h1>Welcome to LookScout Examination Application!</h1>
            <br />
            {UserRole === "admin" ? (
              <h3>
                Hello Admin! You have access to administrative features and
                controls.
              </h3>
            ) : (
              <h3>
                Hello {UserRole}! Welcome to Lookscout Examination Systems.
              </h3>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default WelcomeComponent;
