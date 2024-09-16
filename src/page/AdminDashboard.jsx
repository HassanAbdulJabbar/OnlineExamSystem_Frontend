import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";

import { endpoints } from "../endpoints/endpoints";
import Header from "../components/Header/Header";
import axiosInstance from "../interceptors/interceptor";
import Footer from "../components/Footer/Footer";

const ApprovalList = () => {
  const [exams, setExams] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedExam, setEditedExam] = useState(null);
  const [editedApprovalStatus, setEditedApprovalStatus] = useState("");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axiosInstance.get(
        endpoints.examApproval.updatedExams
      );
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleShowEditModal = (exam) => {
    setEditedExam(exam);
    setEditedApprovalStatus(exam.approved);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditApproval = async () => {
    try {
      await axiosInstance.put(
        endpoints.adminEditApproval.editExamApproval(editedExam._id),
        {
          approved: editedApprovalStatus,
        }
      );

      setExams((prevExams) =>
        prevExams.map((exam) =>
          exam._id === editedExam._id
            ? { ...exam, approved: editedApprovalStatus }
            : exam
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing approval:", error);
    }
  };

  return (
    <>
      <>
        <Header />
        <div className="mt-5 pt-5 mb-5 pb-5 mx-lg-5 mx-md-3 mx-sm-1">
          <h1 className="mb-2 text-center">
            <strong>Exam Approval Status</strong>
          </h1>
          <br />
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Approval Status</th>
                  <th>Exam ID</th>
                  <th>Approval Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(exams) && exams.length > 0 ? (
                  exams.map((exam) => (
                    <tr key={exam._id}>
                      <td>{exam.approved}</td>
                      <td>{exam.exam}</td>
                      <td>{new Date(exam.approvalDate).toLocaleString()}</td>
                      {exam.approved === "Disapproved" && (
                        <td>
                          <Button
                            className="my-1"
                            variant="warning"
                            onClick={() => handleShowEditModal(exam)}
                          >
                            Edit Exam
                          </Button>
                        </td>
                      )}
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
        </div>
        <Footer />
      </>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedExam && (
            <div>
              <p>
                <strong>Exam ID:</strong> {editedExam.exam}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleEditApproval}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApprovalList;
