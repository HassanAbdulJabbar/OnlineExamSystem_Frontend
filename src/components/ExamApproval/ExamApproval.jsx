import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Container, Modal, Table } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ExamApprovalComponent = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}apii/examslist`
        );

        setExams(response.data.exams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const approveExam = async (examId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/admin/approveQuestionnaire/${examId}`
      );
      const updatedExams = await axios.get(
        `${process.env.REACT_APP_BASE_URL}examapprovals/examApprovals`
      );
      console.log(updatedExams.data);
      setExams(updatedExams.data);
    } catch (error) {
      console.error("Error approving exam:", error);
    }
  };

  const disapproveExam = async (examId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/admin/disapproveQuestionnaire/${examId}`
      );
      const updatedExams = await axios.get(
        `${process.env.REACT_APP_BASE_URL}apii/examslist`
      );
      setExams(updatedExams.data.exams);
    } catch (error) {
      console.error("Error disapproving exam:", error);
    }
  };

  const cancelExam = async (examId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/admin/cancelExam/${examId}`
      );
      const updatedExams = await axios.get(
        `${process.env.REACT_APP_BASE_URL}apii/examslist`
      );
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
    <Container fluid>
      <Header />
      <Container className="mt-5 mb-5 pt-5 pb-5">
        <h1 className="text-center mb-4">
          <strong>Exam Approvals</strong>
        </h1>
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
              exams?.map((exam) => (
                <tr key={exam._id}>
                  <td>{exam._id}</td>
                  <td>{new Date(exam.startDateTime).toLocaleString()}</td>
                  <td>{new Date(exam.expiryDateTime).toLocaleString()}</td>
                  <td>{exam.approved || "Pending"}</td>
                  <td>
                    {exam.approved === "approved" && (
                      <>
                        <Button
                          variant="danger"
                          onClick={() => cancelExam(exam._id)}
                        >
                          Cancel Exam
                        </Button>{" "}
                      </>
                    )}
                    {exam.approved !== "approved" &&
                      exam.approved !== "disapproved" && (
                        <>
                          <Button
                            variant="info"
                            className="mx-5"
                            onClick={() => viewExam(exam)}
                          >
                            View Exam
                          </Button>{" "}
                          <Button
                            variant="success"
                            onClick={() => approveExam(exam._id)}
                          >
                            Approve Exam
                          </Button>{" "}
                          <Button
                            variant="warning"
                            onClick={() => disapproveExam(exam._id)}
                          >
                            Disapprove Exam
                          </Button>{" "}
                        </>
                      )}
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
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>{selectedExam?.title}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedExam?.questions?.map((question) => (
              <div key={question._id}>
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
    </Container>
  );
};

export default ExamApprovalComponent;
