import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Auth from "./components/Auth/Auth";
import AdminDashboard from "./page/AdminDashboard";
import ApprovalList from "./page/AdminDashboard";
import AdminExamDetails from "./page/AdminExamDetails";
import AdminExamApproval from "./page/AdminDashboard";
import CreateExam from "./components/CreateExam/CreateExam";
import UserProfile from "./components/UserProfile/UserProfile";
import ProtectedRoute from "./components/ProctectedRoute/ProctectedRoute";
import ExamList from "./components/ExamList/ExamList";
import InstructionPage from "./components/InstructionsPage/InstructionsPage";
import AdminPagee from "./page/AdminUserRecords";
import ActiveExamsTable from "./page/TeacherExamsList";
import UserRole from "./page/UserRole";
import AdminPage from "./page/AdminOps";
import ExamComponent from "./components/Exam/Exam";
import WelcomeComponent from "./components/WelcomeComponent/WelcomeComponent";
import Error404 from "./page/error";
import EmailControl from "./components/Email/EmailControl";
import ExamApprovalComponent from "./components/ExamApproval/ExamApproval";
import ExamDetails from "./page/ExamOutcomes";

const userRole = {
  admin: "admin",
  Teacher: "Teacher",
  Student: "Student",
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route
          path="/examoutcomes"
          element={
            <ProtectedRoute
              Component={ExamDetails}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              Component={UserProfile}
              role={userRole.Student}
              unauthorizedAccess={false}
            />
          }
        />
        <Route path="/" element={<UserRole />} />
        <Route
          path="/examapproval"
          element={
            <ProtectedRoute
              Component={ExamApprovalComponent}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />

        <Route
          path="/emailinvites"
          element={
            <ProtectedRoute
              Component={EmailControl}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/welcomeee"
          element={
            <ProtectedRoute
              Component={WelcomeComponent}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute
              Component={WelcomeComponent}
              role={userRole.Teacher}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/welcomee"
          element={
            <ProtectedRoute
              Component={WelcomeComponent}
              role={userRole.Student}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              Component={AdminDashboard}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              Component={AdminPage}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/admin/exam-approval"
          element={
            <ProtectedRoute
              Component={AdminExamApproval}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/examList"
          exact
          element={
            <ProtectedRoute
              Component={ExamList}
              role={userRole.Student}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/instruction/:examId"
          element={
            <ProtectedRoute
              Component={InstructionPage}
              role={userRole.Student}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              Component={AdminPagee}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/examslist"
          element={
            <ProtectedRoute
              Component={ActiveExamsTable}
              role={userRole.Teacher}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/approvalslist"
          element={
            <ProtectedRoute
              Component={ApprovalList}
              role={userRole.Teacher}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/admin/exam/:id"
          element={
            <ProtectedRoute
              Component={AdminExamDetails}
              role={userRole.admin}
              unauthorizedAccess={false}
            />
          }
        />
        <Route
          path="/teacher/create-exam"
          element={
            <ProtectedRoute
              Component={CreateExam}
              role={userRole.Teacher}
              unauthorizedAccess={false}
            />
          }
        />

        <Route
          path="/exam"
          element={
            <ProtectedRoute
              Component={ExamComponent}
              role={userRole.Student}
              unauthorizedAccess={false}
            />
          }
        />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
