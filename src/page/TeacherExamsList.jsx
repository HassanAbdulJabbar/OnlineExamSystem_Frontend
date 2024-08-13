// ActiveExamsTable.js
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Container } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const ActiveExamsTable = () => {
  const [exams, setExams] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${baseURL}apii/examslist`);
        console.log("API Response:", response.data);
        setExams(response.data.exams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, [baseURL]);

  const handleViewExam = (examId) => {
    // You can customize this logic based on your application's needs.
    // For now, let's just log the selected exam and show a modal.
    const selectedExam = exams.find((exam) => exam._id === examId);
    setSelectedExam(selectedExam);
    setShowExamModal(true);
  };

  const handleRemoveExam = async (examId) => {
    try {
      // Make an API call to remove the entire exam    x
      await axios.delete(`${baseURL}apii/exams/:${examId}`);

      // Update the local state to reflect the change
      setExams((prevExams) => {
        const updatedExams = prevExams.filter((exam) => exam._id !== examId);
        return updatedExams;
      });

      console.log(`Removed exam from exams with ID ${examId}`);
    } catch (error) {
      console.error("Error removing exam:", error);
    }
  };

  const handleDeleteExam = async (examId) => {
    try {
      // Make an API call to delete the exam
      await axios.delete(`${baseURL}apii/exams/${examId}`);

      // Update the local state to reflect the removal
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== examId));

      // Close the delete confirmation modal
      setShowDeleteConfirmModal(false);

      console.log(`Deleted exam with ID ${examId}`);
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleShowDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
  };

  const handleCloseExamModal = () => {
    setShowExamModal(false);
  };

  return (
    <>
      <Container fluid>
        <Header />
        <div className="mt-5 pt-5 mb-5 pb-5 mx-lg-5 mx-md-3 mx-sm-2">
          <h1 className="mb-3 text-center">Active Exams</h1>
          <br />
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(exams) && exams.length > 0 ? (
                  exams.map((exam) => (
                    <tr key={exam._id}>
                      <td>{exam.title}</td>
                      <td>{new Date(exam.startDateTime).toLocaleString()}</td>
                      <td>{new Date(exam.expiryDateTime).toLocaleString()}</td>
                      <td>
                        <Button
                          className="mx-3 my-1"
                          variant="info"
                          onClick={() => handleViewExam(exam._id)}
                        >
                          View Exam
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleRemoveExam(exam._id /* questionId */)
                          }
                        >
                          Remove Exam
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No exams available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Modal show={showExamModal} onHide={handleCloseExamModal}>
            <Modal.Header closeButton>
              <Modal.Title>Exam Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedExam && (
                <div>
                  <h5 className="mb-5 mt-3 text-center">
                    <strong>Title: {selectedExam.title}</strong>
                  </h5>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(selectedExam.startDateTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>Expiry Date:</strong>{" "}
                    {new Date(selectedExam.expiryDateTime).toLocaleString()}
                  </p>
                  <h6 className="mt-3 mb-2">
                    <strong>Questions:</strong>
                  </h6>
                  {selectedExam.questions.map((question, index) => (
                    <div key={question._id} className="mb-3">
                      <p>
                        <strong>Question {index + 1}:</strong> {question.text}
                      </p>
                      <p>
                        <strong>Options:</strong> {question.options.join(", ")}
                      </p>
                      <p>
                        <strong>Correct Answer:</strong>{" "}
                        {question.correctAnswer}
                      </p>
                      <hr className="my-2" />
                    </div>
                  ))}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseExamModal}>
                Close
              </Button>
              <Button variant="danger" onClick={handleShowDeleteConfirmModal}>
                Delete Exam
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showDeleteConfirmModal}
            onHide={handleCloseDeleteConfirmModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this exam?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseDeleteConfirmModal}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteExam(selectedExam._id)}
              >
                Confirm Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default ActiveExamsTable;
