import React, { useEffect, useRef, useState } from "react";
import { clockInApi, getCurrentInTimeApi } from "../store/Services";
import FullScreenLoader from "./FullScreenLoader";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ClockInOutComp = ({ userId, setRefetchState }: any) => {
  const [isLoading, setIsLoading]: any = useState(false);
  const [latestRecord, setLatestRecord]: any = useState({});
  const [timeDifference, setTimeDifference]: any = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const capturePhoto = async () => {
    try {
     
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        const video = videoRef.current;
        await new Promise((resolve) => (video.onloadedmetadata = resolve));

      
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

       
        stream.getTracks().forEach((track) => track.stop());

        
        return canvas.toDataURL("image/jpeg");
      }
    } catch (err) {
      console.error("Failed to capture photo:", err);
      return null;
    }
  };

  const clockInbtnHandler = async (val: string) => {
    const photo = await capturePhoto(); 
    
    
    const formData = new FormData();
    formData.append("uuid", userId);
    formData.append("in_time", val === "out_time" ? "" : "in_time");
    formData.append("out_time", val === "in_time" ? "" : "out_time");
  
    if (photo) {
    
      const blob = await fetch(photo).then((res) => res.blob());
  
      if (val === "in_time") {
        formData.append("in_image", blob, "in_image.jpg");
      } else if (val === "out_time") {
        formData.append("out_image", blob, "out_image.jpg");
      }
    }
    
   
    try {
      await clockInApi({ body: formData });
      getLatestRecord();
    } catch (err: any) {
      console.log("err", err);
    }
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
      <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline />
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
