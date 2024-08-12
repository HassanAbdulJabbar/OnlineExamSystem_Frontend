import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Button, Container, Form, Modal, Table } from "react-bootstrap";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { endpoints } from "../endpoints";

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await Axios.get(endpoints.adminAddUsers.getAllUsers);

      // Separate students and teachers based on userType
      const studentData = response.data.filter(
        (user) => user.userType === "Student"
      );
      const teacherData = response.data.filter(
        (user) => user.userType === "Teacher"
      );

      setStudents(studentData);
      setTeachers(teacherData);
      // setAdmin(adminData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setUpdateName("");
    setUpdatePassword("");
    setUpdateEmail("");
    setUpdateUsername("");
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      let updateUserEndpoint;

      if (selectedUser.userType === "Student") {
        updateUserEndpoint = endpoints.adminUpdateUsers?.updateStudent;
      } else if (selectedUser.userType === "Teacher") {
        updateUserEndpoint = endpoints.adminUpdateUsers?.updateTeacher;
      }

      await Axios.put(endpoints.adminUpdateUsers.updatedUserEndpoint, {
        name: updateName,
        password: updatePassword, // Add password to the update request
        email: updateEmail, // Add email to the update request
        username: updateUsername, // Add username to the update request
      });

      fetchUsers(); // Refresh the user list after updating
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!selectedUser) {
        // Handle the case where selectedUser is null
        console.error("Selected user is null.");
        handleCloseModal();
        return;
      }

      let deleteUserEndpoint;

      if (selectedUser.userType === "Student") {
        deleteUserEndpoint = endpoints.adminDeleteUsers.deleteStudent;
      } else if (selectedUser.userType === "Teacher") {
        deleteUserEndpoint = endpoints.adminDeleteUsers.deleteTeacher;
      }

      await Axios.delete(endpoints.adminDeleteUsers.DeleteUserEndpoint);
      fetchUsers(); // Refresh the user list after deleting
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container fluid>
      <Header />
      <Container className="mt-5 pt-5 mb-5 pb-5">
        <h1 className="mb-4 text-center">
          <strong>User Records</strong>
        </h1>
        <h2 className="mb-2">
          <strong>Students</strong>
        </h2>
        <Table striped bordered hover className="mb-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student._id}</td>
                <td>{student.name}</td>
                <td>{student.userType}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewDetails(student)}
                  >
                    View Details
                  </Button>{" "}
                  <Button
                    variant="warning"
                    onClick={() => handleViewDetails(student)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleViewDetails(student)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h2 className="mb-2">
          <strong>Teachers</strong>
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher._id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.userType}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewDetails(teacher)}
                  >
                    View Details
                  </Button>{" "}
                  <Button
                    variant="warning"
                    onClick={() => handleViewDetails(teacher)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(teacher)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for viewing/updating user details */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <div>
                <p>ID: {selectedUser._id}</p>
                <p>Name: {selectedUser.name}</p>
                <p>User Type: {selectedUser.userType}</p>
                {/* Add other details as needed */}
              </div>
            )}
            <Form>
              <Form.Group controlId="updateName">
                <Form.Label>Update Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new name"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
              </Form.Group>
              {/* Additional fields for updating password, email, and username */}
              <Form.Group controlId="updatePassword">
                <Form.Label>Update Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={updatePassword}
                  onChange={(e) => setUpdatePassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="updateEmail">
                <Form.Label>Update Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter new email"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="updateUsername">
                <Form.Label>Update Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new username"
                  value={updateUsername}
                  onChange={(e) => setUpdateUsername(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateUser}>
              Update User
            </Button>
            <Button variant="danger" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </Container>
  );
};

export default AdminPage;
