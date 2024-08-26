import React, { useState, useEffect } from "react";
import axios from "axios";
import ExamContext from "./ExamContext";
import { endpoints } from "../endpoints/endpoints";

const ExamProvider = ({ children }) => {
  const [approvedExams, setApprovedExams] = useState([]);

  useEffect(() => {
    const fetchApprovedExams = async () => {
      try {
        const approvalResponse = await axios.get(
          endpoints.examApproval.updatedExams
        );

        if (!Array.isArray(approvalResponse.data)) {
          console.error("Invalid data structure for exam approvals");
          return;
        }

        const approvedExamIds = approvalResponse.data
          .filter((approval) => approval.approved === "approved")
          .map((approval) => approval.exam);

        const examsResponse = await axios.get(endpoints.examApproval.getExams);

        if (!Array.isArray(examsResponse.data.exams)) {
          console.error("Invalid data structure for exams list");
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
    <ExamContext.Provider value={{ approvedExams }}>
      {children}
    </ExamContext.Provider>
  );
};

export default ExamProvider;
