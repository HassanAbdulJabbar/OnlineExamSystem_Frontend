export const MultipleChoiceQuestion = {
  type: "multipleChoice",
  text: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  marks: 1,
};

export const TextBasedQuestion = {
  type: "textBased",
  text: "",
  correctAnswer: "",
  marks: 1,
};

export const ExamData = {
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
};
