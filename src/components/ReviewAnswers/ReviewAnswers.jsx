// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ReviewAnswers = ({ userId, examId }) => {
//   const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     const fetchAnswers = async () => {
//       try {
//         const response = await axios.get(
//           `/api/review-answers/${userId}/${examId}`
//         );
//         setAnswers(response.data.answers);
//       } catch (error) {
//         console.error("Error fetching answers:", error);
//         // Handle error appropriately
//       }
//     };

//     fetchAnswers();
//   }, [userId, examId]);

//   return (
//     <div>
//       <h2>Review Answers</h2>
//       <ul>
//         {answers.map((answer) => (
//           <li key={answer._id}>
//             <p>Candidate: {answer.candidate.name}</p>
//             <p>Answer: {answer.answer}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReviewAnswers;
