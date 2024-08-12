const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  auth: {
    signin: `${BASE_URL}authRoutes/auth/signin`,
    signup: `${BASE_URL}authRoutes/auth/signup`,
  },
  createExam: {
    newExam: `${BASE_URL}apii/exams`,
  },
  sendEmail: {
    newEmail: `${BASE_URL}mailer/send-invite`,
  },
  exam: {
    userExam: `${BASE_URL}anwers/answer`,
  },
  examApproval: {
    getExams: `${BASE_URL}apii/examslist`,
    approveExams: (examId) =>
      `${BASE_URL}api/admin/approveQuestionnaire/${examId}`,
    updatedExams: `${BASE_URL}examapprovals/examApprovals`,
    disapproveExams: (examId) =>
      `${BASE_URL}api/admin/disapproveQuestionnaire/${examId}`,
    cancelExams: (examId) => `${BASE_URL}api/admin/cancelExam/${examId}`,
  },
  userProfile: {
    currentUser: `${BASE_URL}}api/users`,
  },
  adminEditApproval: {
    editExamApproval: (editedExamId) =>
      `${BASE_URL}examapprovals/editApproval/${editedExamId}`,
  },
  adminAddUsers: {
    userAdd: (userType) => `${BASE_URL}api/admin/add${userType}`,
    getAllUsers: `${BASE_URL}api/users`,
  },
  adminUpdateUsers: {
    updateStudent: (selectedUserId) => `updateStudent/${selectedUserId}`,
    updateTeacher: (selectedUserId) => `updateTeacher/${selectedUserId}`,
    updatedUserEndpoint: (updateUserEndpoint) =>
      `${BASE_URL}api/admin/${updateUserEndpoint}`,
  },
  adminDeleteUsers: {
    deleteStudent: (selectedUserId) => `removeStudent/${selectedUserId}`,
    deleteTeacher: (selectedUserId) => `removeTeacher/${selectedUserId}`,
    DeleteUserEndpoint: (deleteUserEndpoint) =>
      `${BASE_URL}api/admin/${deleteUserEndpoint}`,
  },
  examOutcomes: {
    examResult: `${BASE_URL}anwers/answer/exam`,
  },
  removeExam: {
    deleteExam: (examId) => `${BASE_URL}apii/exams/${examId}`,
    remove: (examId) => `${BASE_URL}apii/exams/:${examId}`,
  },
};
