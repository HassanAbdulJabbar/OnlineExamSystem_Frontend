import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { endpoints } from "../endpoints";

const ExamDetails = () => {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    // Fetch data from taken exam API
    const fetchData = async () => {
      try {
        const examResponse = await fetch(endpoints.examOutcomes.examResult);

        if (!examResponse.ok) {
          throw new Error(
            `Failed to fetch exam data: ${examResponse.statusText}`
          );
        }

        const { answers } = await examResponse.json();

        // Filter duplicates based on candidate and exam ID
        const uniqueRecords = answers.reduce((acc, current) => {
          const existingRecord = acc.find(
            (record) =>
              record.candidate === current.candidate &&
              record.exam === current.exam
          );

          if (!existingRecord) {
            acc.push(current);
          }

          return acc;
        }, []);

        setExamData(uniqueRecords || []);
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Header />
      <Container className="mt-5 pt-5 mb-5 pb-5">
        <h2 className="mb-4 text-center">
          <strong>Student Exam History</strong>
        </h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Candidate ID</th>
              <th>Exam ID</th>
              {/* <th>Answers</th> */}
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((answer) => (
              <tr key={answer._id}>
                <td>{answer.status}</td>
                <td>{answer.candidate}</td>
                <td>{answer.exam}</td>
                {/* <td>{answer.answers.join(", ")}</td> */}
                <td>{new Date(answer.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </Container>
  );
};

export default ExamDetails;
