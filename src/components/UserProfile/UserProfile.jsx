import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, Container, Col, Row } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const loggedUser = response.data.filter((user) => user._id === userId);
      setUser(loggedUser[0]);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  });

  return (
    <Container fluid>
      <Header />
      <Container className="mt-5 pt-5 mb-5 pb-5">
        <h2 className="mb-4 text-center">
          <strong>User Profile</strong>
        </h2>
        <Card
          className="mx-auto p-3"
          style={{
            maxWidth: "600px",
            backgroundColor: "#e3f2fd",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Card.Body>
            {user && (
              <Row className="align-items-center">
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <img
                    src={user.profilePicture ? user.profilePicture : null}
                    alt="ProfilePicture"
                    className="img-fluid rounded-circle"
                    style={{
                      height: "150px",
                      width: "150px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col xs={12} md={8}>
                  <h5 className="mb-3">
                    <strong>Name:</strong> {user.name}
                  </h5>
                  <h5 className="mb-3">
                    <strong>Email:</strong> {user.email}
                  </h5>
                  <h5 className="mb-3">
                    <strong>User Type:</strong> {user.userType}
                  </h5>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </Container>
  );
};

export default UserProfile;
