// import React, { useState, useEffect } from "react";

// import { Button, Container, Form } from "react-bootstrap";

// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

// const CreateExam = () => {
//   const [questionType, setQuestionType] = useState("multipleChoice");
//   const [exam, setExam] = useState({
//     title: "",
//     startDateTime: "",
//     expiryDateTime: "",
//     questions: [
//       {
//         type: "multipleChoice",
//         text: "",
//         options: ["", "", "", ""],
//         correctAnswer: "",
//       },
//     ],
//   });

//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     // Validate exam data before sending it to the backend
//     const areQuestionsValid = exam.questions.every((question) => {
//       if (question.type === "multipleChoice") {
//         return (
//           question.text.trim() !== "" &&
//           question.options.every((opt) => opt.trim() !== "")
//         );
//       } else {
//         return (
//           question.text.trim() !== "" && question.correctAnswer.trim() !== ""
//         );
//       }
//     });

//     const isExamValid =
//       areQuestionsValid &&
//       exam.title.trim() !== "" &&
//       exam.startDateTime &&
//       exam.expiryDateTime;

//     setIsValid(isExamValid);
//   }, [exam]);

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...exam.questions];
//     updatedQuestions[index][field] = value;
//     setExam({ ...exam, questions: updatedQuestions });
//   };

//   const handleOptionChange = (questionIndex, optionIndex, value) => {
//     const updatedQuestions = [...exam.questions];
//     updatedQuestions[questionIndex].options[optionIndex] = value;
//     setExam({ ...exam, questions: updatedQuestions });
//   };

//   const handleAddQuestion = (questionType) => {
//     const newQuestion =
//       questionType === "multipleChoice"
//         ? {
//             type: "multipleChoice",
//             text: "",
//             options: ["", "", "", ""],
//             correctAnswer: "",
//           }
//         : { type: "textBased", text: "", correctAnswer: "" };

//     setExam({
//       ...exam,
//       questions: [...exam.questions, newQuestion],
//     });
//   };

//   const handleCreateExam = async () => {
//     if (!isValid) {
//       console.error("Exam data is not valid.");
//       return;
//     }

//     try {
//       const apiUrl = process.env.REACT_APP_BASE_URL + "apii/exams";

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(exam),
//       });

//       if (response.ok) {
//         console.log("Exam created successfully!");
//         // TODO: Add any additional logic after successful exam creation
//       } else {
//         console.error("Failed to create exam:", response.statusText);
//         // TODO: Handle error cases
//       }
//     } catch (error) {
//       console.error("Error creating exam:", error.message);
//       // TODO: Handle error cases
//     }
//   };

//   return (
//     <Container fluid>
//       <Header />
//       <Container className="mt-5 mb-5 pt-5 pb-5">
//         <h2 className="mb-5">Create Exam</h2>
//         <Form>
//           <Form.Group controlId="examTitle" className="mb-4">
//             <Form.Label>Exam Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter exam title"
//               value={exam.title}
//               onChange={(e) => setExam({ ...exam, title: e.target.value })}
//             />
//           </Form.Group>
//           <Form.Group controlId="startDateTime" className="mb-4">
//             <Form.Label>Start Date and Time</Form.Label>
//             <Form.Control
//               type="datetime-local"
//               value={exam.startDateTime}
//               onChange={(e) =>
//                 setExam({ ...exam, startDateTime: e.target.value })
//               }
//             />
//           </Form.Group>
//           <Form.Group controlId="expiryDateTime" className="mb-4">
//             <Form.Label>Expiry Date and Time</Form.Label>
//             <Form.Control
//               type="datetime-local"
//               value={exam.expiryDateTime}
//               onChange={(e) =>
//                 setExam({ ...exam, expiryDateTime: e.target.value })
//               }
//             />
//           </Form.Group>
//           <Form.Group controlId="questionType" className="mb-4">
//             <Form.Label>Select Question Type</Form.Label>
//             <Form.Control
//               as="select"
//               value={questionType}
//               onChange={(e) => setQuestionType(e.target.value)}
//             >
//               <option value="multipleChoice">Multiple Choice</option>
//               <option value="textBased">Text-based</option>
//             </Form.Control>
//           </Form.Group>
//           {exam.questions.map((question, index) => (
//             <div key={index}>
//               {question.type === "multipleChoice" ? (
//                 <div>
//                   <Form.Group
//                     controlId={`questionText${index}`}
//                     className="mb-4"
//                   >
//                     <Form.Label>
//                       <strong>Question {index + 1}</strong>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder={`Enter question ${index + 1}`}
//                       value={question.text}
//                       onChange={(e) =>
//                         handleQuestionChange(index, "text", e.target.value)
//                       }
//                     />
//                   </Form.Group>
//                   {[0, 1, 2, 3].map((optionIndex) => (
//                     <Form.Group
//                       key={optionIndex}
//                       className="mb-4"
//                       controlId={`option${index}_${optionIndex}`}
//                     >
//                       <Form.Check
//                         type="radio"
//                         label={`Option ${optionIndex + 1}`}
//                         checked={
//                           question.correctAnswer === optionIndex.toString()
//                         }
//                         onChange={() =>
//                           handleQuestionChange(
//                             index,
//                             "correctAnswer",
//                             optionIndex.toString()
//                           )
//                         }
//                       />
//                       <Form.Control
//                         type="text"
//                         placeholder={`Enter option ${optionIndex + 1}`}
//                         value={question.options[optionIndex]}
//                         onChange={(e) =>
//                           handleOptionChange(index, optionIndex, e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   ))}
//                 </div>
//               ) : (
//                 <div>
//                   <Form.Group
//                     controlId={`questionText${index}`}
//                     className="mb-4"
//                   >
//                     <Form.Label>
//                       <strong>Text-based Question {index + 1}</strong>
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder={`Enter text-based question ${index + 1}`}
//                       value={question.text}
//                       onChange={(e) =>
//                         handleQuestionChange(index, "text", e.target.value)
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group
//                     controlId={`correctAnswer${index}`}
//                     className="mb-4"
//                   >
//                     <Form.Label>Correct Answer</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder={`Enter correct answer for question ${
//                         index + 1
//                       }`}
//                       value={question.correctAnswer}
//                       onChange={(e) =>
//                         handleQuestionChange(
//                           index,
//                           "correctAnswer",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </Form.Group>
//                 </div>
//               )}
//             </div>
//           ))}
//           {/* <Button variant="primary" onClick={handleAddQuestion}>
//             Add Question
//           </Button>{" "} */}
//           <Button
//             variant="primary"
//             onClick={() => handleAddQuestion("multipleChoice")}
//           >
//             Add Multiple Choice Question
//           </Button>
//           {"  "}
//           <Button
//             variant="primary"
//             onClick={() => handleAddQuestion("textBased")}
//           >
//             Add Text-based Question
//           </Button>
//           <Button
//             variant="success"
//             onClick={handleCreateExam}
//             style={{ float: "right" }}
//             disabled={!isValid}
//           >
//             Create Exam
//           </Button>
//         </Form>
//       </Container>
//       <Footer />
//     </Container>
//   );
// };

// export default CreateExam;

import React, { useState, useEffect } from "react";

import { Button, Container, Form } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const CreateExam = () => {
  const [questionType, setQuestionType] = useState("multipleChoice");

  const [exam, setExam] = useState({
    title: "",
    startDateTime: "",
    expiryDateTime: "",
    questions: [
      {
        type: "multipleChoice",
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: 1,
      },
    ],
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const areQuestionsValid = exam.questions.every((question, index) => {
      if (question.type === "multipleChoice") {
        return (
          question.text.trim() !== "" &&
          question.options.every((opt) => opt.trim() !== "") &&
          question.marks > 0
        );
      } else {
        return (
          question.text.trim() !== "" &&
          question.correctAnswer.trim() !== "" &&
          question.marks > 0
        );
      }
    });

    if (exam.startDateTime && exam.expiryDateTime) {
      const startDate = new Date(exam.startDateTime);
      const endDate = new Date(exam.expiryDateTime);
      const currentDate = new Date();

      const isDateValid = startDate >= currentDate;
      const timeDifferenceMilliseconds = endDate - startDate;
      const maxTimeDifference = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

      const isTimeDifferenceValid =
        timeDifferenceMilliseconds <= maxTimeDifference &&
        timeDifferenceMilliseconds >= 0;

      if (!isTimeDifferenceValid) {
        alert("Please select a valid future date for the exam.");
      } else if (!isDateValid) {
        alert(
          "Please ensure the time difference is less than 3 hours and the end time is after the start time."
        );
      }

      setIsValid(isDateValid && isTimeDifferenceValid && areQuestionsValid);
    } else {
      setIsValid(areQuestionsValid);
    }
  }, [exam]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setExam({ ...exam, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setExam({ ...exam, questions: updatedQuestions });
  };

  const handleAddQuestion = (questionType) => {
    const newQuestion =
      questionType === "multipleChoice"
        ? {
            type: "multipleChoice",
            text: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            marks: 1, // Default marks, you can change it as needed
          }
        : {
            type: "textBased",
            text: "",
            correctAnswer: "",
            marks: 1, // Default marks, you can change it as needed
          };

    setExam({
      ...exam,
      questions: [...exam.questions, newQuestion],
    });
  };

  const handleCreateExam = async () => {
    if (!isValid) {
      console.error("Exam data is not valid.");
      return;
    }

    try {
      const examWithMarks = {
        ...exam,
        questions: exam.questions.map((question) => ({
          ...question,
          marks: parseInt(question.marks, 10),
        })),
      };
      console.log("examWithMarks", examWithMarks);

      const apiUrl = process.env.REACT_APP_BASE_URL + "apii/exams";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examWithMarks), // Use the modified exam object with marks
      });

      if (response.ok) {
        console.log("Exam created successfully!");
        // TODO: Add any additional logic after successful exam creation
      } else {
        console.error("Failed to create exam:", response.statusText);
        // TODO: Handle error cases
      }
    } catch (error) {
      console.error("Error creating exam:", error.message);
      // TODO: Handle error cases
    }
  };

  return (
    <Container fluid>
      <Header />
      <Container className="mt-5 mb-5 pt-5 pb-5">
        <h2 className="mb-5 text-center">
          <strong>Create Exam</strong>
        </h2>
        <Form>
          <Form.Group controlId="examTitle" className="mb-5">
            <Form.Label>
              <strong>Exam Title</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exam title"
              value={exam.title}
              onChange={(e) => setExam({ ...exam, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="startDateTime" className="mb-4">
            <Form.Label>
              <strong>Start Date and Time</strong>
            </Form.Label>
            <Form.Control
              type="datetime-local"
              value={exam.startDateTime}
              onChange={(e) =>
                setExam({ ...exam, startDateTime: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="expiryDateTime" className="mb-5">
            <Form.Label>
              <strong>Expiry Date and Time</strong>
            </Form.Label>
            <Form.Control
              type="datetime-local"
              value={exam.expiryDateTime}
              onChange={(e) =>
                setExam({ ...exam, expiryDateTime: e.target.value })
              }
            />
          </Form.Group>
          {exam.questions.map((question, index) => (
            <div key={index}>
              {question.type === "multipleChoice" ? (
                <div>
                  <Form.Group
                    controlId={`questionText${index}`}
                    className="mb-4"
                  >
                    <Form.Label>
                      <strong>Question {index + 1}</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Enter question ${index + 1}`}
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(index, "text", e.target.value)
                      }
                    />
                  </Form.Group>
                  {[0, 1, 2, 3].map((optionIndex) => (
                    <Form.Group
                      key={optionIndex}
                      className="mb-4"
                      controlId={`option${index}_${optionIndex}`}
                    >
                      <Form.Check
                        type="radio"
                        label={`Option ${optionIndex + 1}`}
                        checked={
                          question.correctAnswer === optionIndex.toString()
                        }
                        onChange={() =>
                          handleQuestionChange(
                            index,
                            "correctAnswer",
                            optionIndex.toString()
                          )
                        }
                      />
                      <Form.Control
                        type="text"
                        placeholder={`Enter option ${optionIndex + 1}`}
                        value={question.options[optionIndex]}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e.target.value)
                        }
                      />
                    </Form.Group>
                  ))}
                </div>
              ) : (
                <div>
                  <Form.Group
                    controlId={`questionText${index}`}
                    className="mb-4"
                  >
                    <Form.Label>
                      <strong>Text-based Question {index + 1}</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Enter text-based question ${index + 1}`}
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(index, "text", e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    controlId={`correctAnswer${index}`}
                    className="mb-4"
                  >
                    <Form.Label>Correct Answer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Enter correct answer for question ${
                        index + 1
                      }`}
                      value={question.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>
                </div>
              )}
              <Form.Group controlId={`marks${index}`} className="mb-4">
                <Form.Label>
                  <strong>
                    Marks for{" "}
                    {question.type === "multipleChoice"
                      ? "Question"
                      : "Text-based Question"}{" "}
                    {index + 1}
                  </strong>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`Enter marks for ${
                    question.type === "multipleChoice"
                      ? "question"
                      : "text-based question"
                  } ${index + 1}`}
                  value={question.marks}
                  onChange={(e) =>
                    handleQuestionChange(index, "marks", e.target.value)
                  }
                />
              </Form.Group>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => handleAddQuestion("multipleChoice")}
          >
            Add Multiple Choice Question
          </Button>
          {"  "}
          <Button
            variant="primary"
            onClick={() => handleAddQuestion("textBased")}
          >
            Add Text-based Question
          </Button>
          <Button
            variant="success"
            onClick={handleCreateExam}
            style={{ float: "right" }}
            disabled={!isValid}
          >
            Create Exam
          </Button>
        </Form>
      </Container>
      <Footer />
    </Container>
  );
};

export default CreateExam;
