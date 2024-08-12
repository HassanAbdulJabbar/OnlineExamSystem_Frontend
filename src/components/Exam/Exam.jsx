import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  FormCheck,
  FormGroup,
  Table,
} from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Timer from "../Timer/Timer";
import ExamContext from "../../context/ExamContext"; // Update the path accordingly
import { endpoints } from "../../endpoints";
import axios from "axios";

const ExamComponent = () => {
  const { approvedExams } = useContext(ExamContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [examId, setExamId] = useState(searchParams.get("examId"));
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [examAttempted, setExamAttempted] = useState(false);
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [totalMarks, setTotalMarks] = useState(0);
  const [passOrFail, setPassOrFail] = useState("");

  useEffect(() => {
    if (examId) {
      const filteredExam = approvedExams.filter((exam) => exam._id === examId);
      if (filteredExam.length > 0) {
        setExam(filteredExam[0]);
        setQuestions(filteredExam[0]?.questions);
      }
    }
  }, [examId, approvedExams]);

  useEffect(() => {
    if (timerExpired && !examSubmitted) {
      handleSubmitExam();
    }
  }, [timerExpired, examSubmitted]);

  const handleNextQuestion = () => {
    if (userResponses[currentQuestionIndex] !== undefined) {
      setCurrentQuestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, questions.length - 1)
      );
      setShowEmptyAlert(false);
    } else {
      setShowEmptyAlert(true);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setShowEmptyAlert(false);
  };

  const handleUserResponse = (response) => {
    const currentQuestion = questions[currentQuestionIndex];
    const obtainedMarksForQuestion =
      response === currentQuestion.correctAnswer ? currentQuestion.marks : 0; // Assign 0 if the answer is wrong

    setUserResponses((prevResponses) => {
      const previousMarks = prevResponses[currentQuestionIndex]?.marks || 0;
      const updatedResponses = {
        ...prevResponses,
        [currentQuestionIndex]: {
          response,
          marks: obtainedMarksForQuestion,
        },
      };

      // Update total marks correctly
      setTotalMarks(
        (prevTotal) => prevTotal - previousMarks + obtainedMarksForQuestion
      );

      return updatedResponses;
    });
  };

  const handleSubmitExam = async () => {
    setExamSubmitted(true);
    setShowResults(true);
    setExamAttempted(true);
    determinePassOrFail();

    try {
      const apiUrl = endpoints.exam.userExam;

      const response = await axios.post(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId,
          userId: localStorage.getItem("id"),
          userResponses: Object.values(userResponses), // Extract values from the object
          totalMarks,
          passOrFail,
        }),
      });

      if (response.ok) {
        console.log("User responses saved successfully!");
      } else {
        console.error("Failed to save user responses:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving user responses:", error.message);
    }
  };

  const calculateResults = () => {
    let correctCount = 0;

    questions.forEach((question, index) => {
      const userResponse = userResponses[index]?.response;
      if (userResponse === question.correctAnswer) {
        correctCount++;
      }
    });

    const percentageCorrect = (correctCount / questions.length) * 100;

    return {
      correctCount,
      totalQuestions: questions.length,
      percentageCorrect,
      resultStatus:
        percentageCorrect >= 85
          ? "Superb/Excellent"
          : percentageCorrect >= 70
          ? "Good"
          : "Fail",
    };
  };

  const determinePassOrFail = () => {
    const totalPossibleMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    const percentageCorrect = (totalMarks / totalPossibleMarks) * 100;

    if (percentageCorrect >= 40) {
      setPassOrFail("Pass");
    } else {
      setPassOrFail("Fail");
    }
  };

  const results = showResults && calculateResults();

  return (
    <Container fluid>
      <Header />

      {examId && questions.length > 0 && (
        <Container className="mt-5 mb-5">
          {!examSubmitted ? (
            <Timer
              onTimeout={() => setTimerExpired(true)}
              submitExam={handleSubmitExam}
              setTimeLeft={setTimeLeft}
              timeLeft={timeLeft}
            />
          ) : (
            <Alert variant="danger">Exam has ended.</Alert>
          )}

          {showResults ? (
            <Container>
              <h3>Exam Results</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                    <th>Marks Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => (
                    <tr key={index}>
                      <td>{question.text}</td>
                      <td>
                        {userResponses[index]?.response ===
                        question?.options[question.correctAnswer] ? (
                          <Alert variant="success">
                            {userResponses[index]?.response}
                          </Alert>
                        ) : (
                          <Alert variant="danger">
                            {userResponses[index]?.response}
                          </Alert>
                        )}
                      </td>
                      <td>{question?.options[question.correctAnswer]}</td>
                      <td>{userResponses[index]?.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Container className="mt-4">
                <div className="text-center">
                  <Alert variant="info">
                    Total Marks Obtained: <strong>{totalMarks}</strong>
                  </Alert>
                  <Alert variant={passOrFail === "Pass" ? "success" : "danger"}>
                    Status: <strong>{passOrFail}</strong>
                  </Alert>
                  <Button variant="primary" as={Link} to="/profile">
                    Go to Homepage
                  </Button>{" "}
                  <Button variant="success" as={Link} to="/examList">
                    Back to Exams List
                  </Button>
                </div>
              </Container>
            </Container>
          ) : (
            <Card className="mb-5" style={{ height: "40vh" }}>
              <Card.Body>
                <Card.Title>
                  {approvedExams[currentExamIndex]?.title}
                </Card.Title>
                <Card.Text>{questions[currentQuestionIndex]?.text}</Card.Text>

                {questions[currentQuestionIndex]?.options && (
                  <Form>
                    {questions[currentQuestionIndex].options.map(
                      (choice, index) => (
                        <FormGroup key={index} controlId={`choice-${index}`}>
                          <FormCheck
                            type="radio"
                            id={`choice-${index}`}
                            label={choice}
                            name="multipleChoiceResponse"
                            onChange={() => handleUserResponse(choice)}
                            checked={
                              userResponses[currentQuestionIndex]?.response ===
                              choice
                            }
                          />
                        </FormGroup>
                      )
                    )}
                  </Form>
                )}

                {showEmptyAlert && (
                  <Alert variant="danger">
                    You cannot go to the next question without attempting the
                    current one.
                  </Alert>
                )}
              </Card.Body>
              <Card.Footer className="text-muted">
                {currentQuestionIndex > 0 && (
                  <Button variant="primary" onClick={handlePreviousQuestion}>
                    Previous Question
                  </Button>
                )}{" "}
                {currentQuestionIndex < questions.length - 1 && (
                  <Button variant="success" onClick={handleNextQuestion}>
                    Next Question
                  </Button>
                )}{" "}
                {currentQuestionIndex === questions.length - 1 &&
                  userResponses[currentQuestionIndex]?.response !==
                    undefined && (
                    <Button variant="success" onClick={handleSubmitExam}>
                      Submit Exam
                    </Button>
                  )}
              </Card.Footer>
            </Card>
          )}
        </Container>
      )}

      <Footer />
    </Container>
  );
};

export default ExamComponent;
