import React, { useEffect, useState } from "react";

const Barchat = () => {
  const [seconds, setSeconds]: any = useState(0);
  const [isRunning, setIsRunning]: any = useState(false);

  const clockInbtnHandler = () => {
    console.log("ma ki chuu mere bete");
    // clockInApi()
    //   .then((res: any) => {
    //     console.log("res", res);
    //   })
    //   .catch((err: any) => console.log("err", err));
  };

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds: any) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [isRunning]);

  const formatTime = (seconds: any) => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  const handleClockIn = () => {
    setIsRunning(true);
  };

  const handleClockOut = () => {
    setIsRunning(false);
  };
  return (
    <div className="timer-container">
      <div className="circle">
        <div className="time">{formatTime(seconds)}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClockIn} className="clock-in">
          Clock In
        </button>
        <button onClick={handleClockOut} className="clock-out">
          Clock Out
        </button>
      </div>
    </div>
  );
};

export default Barchat;
