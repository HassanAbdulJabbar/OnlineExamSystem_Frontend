import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, Container, Col, Row } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { endpoints } from "../../endpoints/endpoints";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("id");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(endpoints.adminAddUsers.getAllUsers);

      const loggedUser = response.data.filter((user) => user._id === userId);
      setUser(loggedUser[0]);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-5 pt-5 mb-5 pb-5">
        <h2 className="mb-4 text-center">
          <strong>User Profile</strong>
        </h2>
        <Card className="mx-auto p-3 profile-card">
          <Card.Body>
            {user && (
              <Row className="align-items-center">
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <img
                    src={user.profilePicture ? user.profilePicture : null}
                    alt="ProfilePicture"
                    className="img-fluid rounded-circle card-image"
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
    </>
  );
};

export default UserProfile;
