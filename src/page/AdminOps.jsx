import React, { useState } from "react";

import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./../styles/App.css";
import { endpoints } from "../endpoints/endpoints";
import axiosInstance from "../interceptors/interceptor";

const AdminPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [userType, setUserType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showEmptyFieldsAlert, setShowEmptyFieldsAlert] = useState(false);

  const handleAddUser = async () => {
    if (!name || !email || !password || !userType) {
      setShowEmptyFieldsAlert(true);
      return;
    }

    try {
      await axiosInstance.post(endpoints.adminAddUsers.userAdd(userType), {
        name,
        email,
        password,
        userType,
        imageUrl,
      });

      setShowAlert(true);

      setName("");
      setEmail("");
      setPassword("");
      setImageUrl(null);
      setUserType("");
      setShowEmptyFieldsAlert(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
  };

  return (
    <>
      <Header />
      <Container className="mt-t pt-5">
        <Row>
          <Col>
            <h1 className="text-center">
              <strong>Add Users</strong>
            </h1>
            <Form>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>
                  <strong>Name</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>
                  <strong>Email</strong>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>
                  <strong>Password</strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="userType" className="mb-3">
                <Form.Label>
                  <strong>User Type</strong>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="">Select User Type</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                </Form.Control>
              </Form.Group>

              {userType === "Student" && (
                <Form.Group controlId="profilePic">
                  <Form.Label>
                    <strong>Profile Picture</strong>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              )}

              <Button
                variant="primary"
                className="mt-4 mb-5 align-btn-right"
                onClick={handleAddUser}
              >
                Add User
              </Button>

              {showAlert && (
                <Alert
                  variant="success"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  User added successfully!
                </Alert>
              )}

              {showEmptyFieldsAlert && (
                <Alert
                  variant="danger"
                  onClose={() => setShowEmptyFieldsAlert(false)}
                  dismissible
                >
                  Please fill in all required fields.
                </Alert>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AdminPage;
