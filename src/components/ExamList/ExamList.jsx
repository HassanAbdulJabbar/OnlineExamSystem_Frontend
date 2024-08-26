import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { endpoints } from "../../endpoints/endpoints";
import "./ExamList.css";

const ExamList = () => {
  const [approvedExams, setApprovedExams] = useState([]);
  const navigate = useNavigate();

  const onClickStartExam = (examId) => {
    navigate(`/exam?examId=${examId}`);
  };

  useEffect(() => {
    const fetchApprovedExams = async () => {
      try {
        const approvalResponse = await axios.get(
          endpoints.examApproval.updatedExams
        );
        if (!Array.isArray(approvalResponse.data)) {
          return;
        }

        const approvedExamIds = approvalResponse.data
          .filter((approval) => approval.approved === "approved")
          .map((approval) => approval.exam);

        const examsResponse = await axios.get(endpoints.examApproval.getExams);
        if (!Array.isArray(examsResponse.data.exams)) {
          return;
        }

        const filteredExams = examsResponse.data.exams.filter((exam) =>
          approvedExamIds.includes(exam._id)
        );
        setApprovedExams(filteredExams);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchApprovedExams();
  }, []);

  return (
    <>
      <Header />
      <Container
        className="mt-5 pt-5 mb-5 pb-5"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h1 className="mb-5 text-center">
          <strong>Current Exams</strong>
        </h1>
        <Row>
          {approvedExams.map((exam, index) => (
            <Col key={exam._id} lg={6} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    <strong>
                      <h3>
                        <strong>{exam.title}</strong>
                      </h3>
                    </strong>
                  </Card.Title>
                  <Card.Text>{exam.description}</Card.Text>
                  <p>
                    <strong>Start Date Time:</strong> {exam.startDateTime}
                  </p>
                  <p>
                    <strong>End Date Time:</strong> {exam.expiryDateTime}
                  </p>
                  {/* <Link to={`/exam?examId=${exam._id}`}> */}
                  <Button
                    variant="btn btn-primary exam-btn"
                    onClick={() => onClickStartExam(exam._id)}
                  >
                    Start Exam
                  </Button>{" "}
                  {/* </Link> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default ExamList;
