import React, { useEffect, useState } from "react";
import { clockInApi, getCurrentInTimeApi } from "../store/Services";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import FullScreenLoader from "./FullScreenLoader";

dayjs.extend(relativeTime);

const ClockInOutComp = ({ userId, setRefetchState }: any) => {
  const [isLoading, setIsLoading]: any = useState(false);
  const [latestRecord, setLatestRecord]: any = useState({});
  const [timeDifference, setTimeDifference]: any = useState(null);

  const getLatestRecord = () => {
    setIsLoading(true);
    getCurrentInTimeApi({
      query: {
        uuid: userId,
      },
    })
      .then((res: any) => {
        setLatestRecord(res.data);
        setIsLoading(false);
        setRefetchState(true);
      })
      .catch((err: any) => {
        console.log("err", err);
        setIsLoading(false);
      });
  };

  const clockInbtnHandler = (val: any) => {
    clockInApi({
      body: {
        in_time: val === "out_time" ? "" : "in_time",
        out_time: val === "in_time" ? "" : "out_time",
        uuid: userId,
      },
    })
      .then(() => {
        getLatestRecord();
      })
      .catch((err: any) => console.log("err", err));
  };

  const handleClockIn = () => {
    clockInbtnHandler("in_time");
  };

  const handleClockOut = () => {
    clockInbtnHandler("out_time");
  };

  const calculateTimeDifference = () => {
    if (latestRecord.in_time && latestRecord.out_time) {
      const diff = dayjs(latestRecord.out_time).diff(
        dayjs(latestRecord.in_time),
        "second"
      );
      setTimeDifference(diff);
    } else if (latestRecord.in_time && !latestRecord.out_time) {
      const diff = dayjs().diff(dayjs(latestRecord.in_time), "second");
      setTimeDifference(diff);
    } else {
      setTimeDifference(null);
    }
  };

  useEffect(() => {
    getLatestRecord();
  }, [userId]);

  useEffect(() => {
    calculateTimeDifference();
    let interval: any = null;
    if (latestRecord.in_time && !latestRecord.out_time) {
      interval = setInterval(calculateTimeDifference, 1000);
    }
    return () => clearInterval(interval);
  }, [latestRecord]);

  return (
    <div className="timer-container">
      <FullScreenLoader loading={isLoading} />
      <div className="circle">
        <div className="time">
          {timeDifference !== null
            ? `${Math.floor(timeDifference / 3600)
                .toString()
                .padStart(2, "0")}:${Math.floor((timeDifference % 3600) / 60)
                .toString()
                .padStart(2, "0")}:${(timeDifference % 60)
                .toString()
                .padStart(2, "0")}`
            : "00:00:00"}
        </div>
      </div>
      <div className="buttons">
        <button
          onClick={handleClockIn}
          disabled={!!latestRecord.in_time}
          className="clock-in"
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          disabled={!!latestRecord.out_time}
          className="clock-out"
        >
          Clock Out
        </button>
      </div>
    </div>
  );
};

export default ClockInOutComp;
