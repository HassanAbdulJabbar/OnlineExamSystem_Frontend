import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Timer = ({ onTimeout }) => {
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
      console.log("Time finished.....redirecting you to homepage/...");
      onTimeout();
    }

    return () => clearInterval(interval);
  }, [seconds, onTimeout]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Container fluid>
      <div
        className="text-center"
        style={{
          fontSize: "50px",
          color: "darkblue",
          justifyContent: "center",
        }}
      >
        {formatTime(seconds)}
      </div>
    </Container>
  );
};

export default Timer;
