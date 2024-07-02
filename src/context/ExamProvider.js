import React, { useState, useEffect } from "react";
import axios from "axios";
import ExamContext from "./ExamContext";

const ExamProvider = ({ children }) => {
  const [approvedExams, setApprovedExams] = useState([]);

  useEffect(() => {
    const fetchApprovedExams = async () => {
      try {
        // Fetch data from the examApprovals collection
        const approvalResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}examapprovals/examApprovals`
        );

        // Ensure the response data is an array
        if (!Array.isArray(approvalResponse.data)) {
          console.error("Invalid data structure for exam approvals");
          return;
        }

        // Filter exams with 'approved' status
        const approvedExamIds = approvalResponse.data
          .filter((approval) => approval.approved === "approved")
          .map((approval) => approval.exam);

        // Fetch exams from the examslist collection based on approved IDs
        const examsResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}apii/examslist`
        );

        // Ensure the response data is an array
        if (!Array.isArray(examsResponse.data.exams)) {
          console.error("Invalid data structure for exams list");
          console.log("Exams Response Data:", examsResponse.data);
          return;
        }

        // Filter exams based on approvedExamIds
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
    <ExamContext.Provider value={{ approvedExams }}>
      {children}
    </ExamContext.Provider>
  );
};

export default ExamProvider;
