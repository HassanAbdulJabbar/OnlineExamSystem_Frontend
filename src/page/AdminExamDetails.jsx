import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { endpoints } from "../endpoints";

const AdminExamDetails = () => {
  const { id } = useParams();
  const [examDetails, setExamDetails] = useState(null);

  useEffect(() => {
    // Fetch exam details by id from the server
    // Update the 'examDetails' state with the response
    fetchExam();
  }, [id]);

  const fetchExam = async () => {
    try {
      const response = await axios.get(endpoints.examApproval.getExams);
      setExamDetails(response.data);
    } catch (error) {
      console.error("Error fetching Exam:", error);
    }
  };

  return (
    <Container fluid>
      <Header />
      <Container>
        <Row>
          <Col>
            <h2>Exam Details</h2>
            {examDetails && (
              <div>
                <p>Subject: {examDetails.subject}</p>
                <p>Start Time: {examDetails.startDateTime}</p>{" "}
                {/* Update the field name */}
                <p>Expiry Time: {examDetails.expiryDateTime}</p>{" "}
                {/* Update the field name */}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default AdminExamDetails;
