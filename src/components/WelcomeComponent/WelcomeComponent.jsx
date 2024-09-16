import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

import { endpoints } from "../../endpoints/endpoints";
import axiosInstance from "../../interceptors/interceptor";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { UserId, UserRole } from "../../services/userState.service";

const WelcomeComponent = () => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get(
        endpoints.adminAddUsers.getAllUsers
      );

      const loggedUser = response.data.filter((user) => user._id === UserId);
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
      <Container className="mt-4">
        <Row>
          <Col className="text-center mt-5 pt-5 mb-5 pt-5">
            {user && (
              <>
                <h1>
                  Hello {user?.name}! Welcome to Dev Geeks Examination
                  Application!
                </h1>
                <br />
                <h5>
                  As {UserRole}, you can proceed by clicking options prensent in
                  the header.
                </h5>
                <br />
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default WelcomeComponent;
