import React, { useState, useEffect } from "react";

import "./Timer.css";

const Timer = ({ onTimeout }) => {
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
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
    <>
      <div className="text-center timer">{formatTime(seconds)}</div>
    </>
  );
};

export default Timer;
