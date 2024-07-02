// import React, { useEffect, useState } from "react";

// import Timer from "../components/Timer";

// const Questionnaire = () => {

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [timerExpired, setTimerExpired] = useState(false);


//   useEffect(() => {
//     // Fetch questions from the server and update 'questions' state
//     setQuestions([""]);
//   }, []);

//   const handleTimeout = () => {
//     setTimerExpired(true);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//     } else {
//       // can submit the answers or perform other actions when all questions are completed
//       // redirect to the home page
//       history.push("/");
//     }
//   };

//   return (
//     <div>
//       <h2>Questionnaire</h2>
//       <Timer onTimeout={handleTimeout} />
//       <p>{questions[currentQuestion]}</p>
//       <button onClick={handleNextQuestion} disabled={timerExpired}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default Questionnaire;
