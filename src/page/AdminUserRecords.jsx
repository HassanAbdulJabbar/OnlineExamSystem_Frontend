import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Button, Form, Modal, Table } from "react-bootstrap";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { endpoints } from "../endpoints/endpoints";
import "../styles/App.css";

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

      const studentData = response.data.filter(
        (user) => user.userType === "Student"
      );
      const teacherData = response.data.filter(
        (user) => user.userType === "Teacher"
      );

      setStudents(studentData);
      setTeachers(teacherData);
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
        updateUserEndpoint = endpoints.adminUpdateUsers.updateStudent(
          selectedUser._id
        );
      } else if (selectedUser.userType === "Teacher") {
        updateUserEndpoint = endpoints.adminUpdateUsers.updateTeacher(
          selectedUser._id
        );
      }

      await Axios.put(
        endpoints.adminUpdateUsers.updatedUserEndpoint(updateUserEndpoint),
        {
          name: updateName,
          password: updatePassword,
          email: updateEmail,
          username: updateUsername,
        }
      );

      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!selectedUser) {
        console.error("Selected user is null.");
        handleCloseModal();
        return;
      }

      let deleteUserEndpoint;

      if (selectedUser.userType === "Student") {
        deleteUserEndpoint = endpoints.adminDeleteUsers.deleteStudent(
          selectedUser._id
        );
      } else if (selectedUser.userType === "Teacher") {
        deleteUserEndpoint = endpoints.adminDeleteUsers.deleteTeacher(
          selectedUser._id
        );
      }

      await Axios.delete(
        endpoints.adminDeleteUsers.DeleteUserEndpoint(deleteUserEndpoint)
      );

      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="mt-5 pt-5 mb-5 pb-5 mx-lg-5 mx-md-3 mx-sm-1 table-alignment">
        <h1 className="mb-4 text-center">
          <strong>User Records</strong>
        </h1>
        <h2 className="mb-2">
          <strong>Students</strong>
        </h2>
        <div className="table-responsive mb-5 table-width">
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
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student._id}</td>
                  <td>{student.name}</td>
                  <td>{student.userType}</td>
                  <td>
                    <div className="d-flex flex-column flex-md-row">
                      <Button
                        variant="info"
                        className="mb-2 mb-md-0"
                        onClick={() => handleViewDetails(student)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="warning"
                        className="mb-2 mb-md-0 mx-md-2"
                        onClick={() => handleViewDetails(student)}
                      >
                        Update
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <h2 className="mb-2">
          <strong>Teachers</strong>
        </h2>
        <div className="table-responsive table-width">
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
                    <div className="d-flex flex-column flex-md-row">
                      <Button
                        variant="info"
                        className="mb-2 mb-md-0"
                        onClick={() => handleViewDetails(teacher)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="warning"
                        className="mb-2 mb-md-0 mx-md-2"
                        onClick={() => handleViewDetails(teacher)}
                      >
                        Update
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal for viewing/updating user details */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="bold">User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <div>
                <p className="bold">ID: {selectedUser._id}</p>
                <p className="bold">Name: {selectedUser.name}</p>
                <p className="bold">User Type: {selectedUser.userType}</p>
              </div>
            )}
            <Form>
              <Form.Group controlId="updateName">
                <Form.Label className="bold">Update Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new name"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="updatePassword">
                <Form.Label className="bold">Update Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={updatePassword}
                  onChange={(e) => setUpdatePassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="updateEmail">
                <Form.Label className="bold">Update Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter new email"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="updateUsername">
                <Form.Label className="bold">Update Username</Form.Label>
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
            <Button
              variant="danger"
              onClick={() => handleDeleteUser(selectedUser)}
            >
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
