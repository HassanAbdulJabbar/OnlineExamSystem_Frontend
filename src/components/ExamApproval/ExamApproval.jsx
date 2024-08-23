import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Container, Modal, Table } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { endpoints } from "../../endpoints";

const ExamApprovalComponent = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(endpoints.examApproval.getExams);

        setExams(response.data.exams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const approveExam = async (examId) => {
    try {
      await axios.put(endpoints.examApproval.approveExams(examId));
      const updatedExams = await axios.get(endpoints.examApproval.updatedExams);
      setExams(updatedExams.data);
    } catch (error) {
      console.error("Error approving exam:", error);
    }
  };

  const disapproveExam = async (examId) => {
    try {
      await axios.put(endpoints.examApproval.disapproveExams(examId));
      const updatedExams = await axios.get(endpoints.examApproval.getExams);
      setExams(updatedExams.data.exams);
    } catch (error) {
      console.error("Error disapproving exam:", error);
    }
  };

  const cancelExam = async (examId) => {
    try {
      await axios.put(endpoints.examApproval.cancelExams(examId));
      const updatedExams = await axios.get(endpoints.examApproval.getExams);
      setExams(updatedExams.data.exams);
    } catch (error) {
      console.error("Error cancelling exam:", error);
    }
  };

  const viewExam = (exam) => {
    setSelectedExam(exam);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <Container className="mt-5 mb-5 pt-5 pb-5">
        <h1 className="text-center mb-4">
          <strong>Exam Approvals</strong>
        </h1>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
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
                    <td>{exam.approved || "Pending"}</td>
                    <td>
                      <div className="d-flex flex-column flex-md-row justify-content-center">
                        {exam.approved === "approved" && (
                          <Button
                            variant="danger"
                            className="mb-2 mb-md-0"
                            onClick={() => cancelExam(exam._id)}
                          >
                            Cancel Exam
                          </Button>
                        )}
                        {exam.approved !== "approved" &&
                          exam.approved !== "disapproved" && (
                            <>
                              <Button
                                variant="info"
                                className="mb-2 mb-md-0 mx-md-2"
                                onClick={() => viewExam(exam)}
                              >
                                View Exam
                              </Button>
                              <Button
                                variant="success"
                                className="mb-2 mb-md-0 mx-md-2"
                                onClick={() => approveExam(exam._id)}
                              >
                                Approve Exam
                              </Button>
                              <Button
                                variant="warning"
                                className="mb-2 mb-md-0"
                                onClick={() => disapproveExam(exam._id)}
                              >
                                Disapprove Exam
                              </Button>
                            </>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No exams available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>{selectedExam?.title}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedExam?.questions?.map((question) => (
              <div key={question._id} className="mb-3">
                <p>
                  <strong>Question: </strong>
                  {question.text}
                </p>
                <ul>
                  {question?.options?.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
                <p>
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default ExamApprovalComponent;
