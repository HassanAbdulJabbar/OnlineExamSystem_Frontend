import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { endpoints } from "../endpoints/endpoints";

const AdminExamDetails = () => {
  const { id } = useParams();
  const [examDetails, setExamDetails] = useState(null);

  useEffect(() => {
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
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h2>Exam Details</h2>
            {examDetails && (
              <div>
                <p>Subject: {examDetails.subject}</p>
                <p>Start Time: {examDetails.startDateTime}</p>{" "}
                <p>Expiry Time: {examDetails.expiryDateTime}</p>{" "}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AdminExamDetails;
