import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import ExamProvider from "./context/ExamProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ExamProvider>
      <App />
    </ExamProvider>
  </React.StrictMode>
);
