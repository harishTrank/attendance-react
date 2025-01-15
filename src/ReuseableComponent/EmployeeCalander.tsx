import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import { employeeAttendanceCalenderApi } from "../store/Services";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const EmployeeCalander = ({ userId, refetchState ,setTotalPresent,setTotalAbsent }: any) => {
  const [calendarData, setCalendarData]: any = useState([]);
  const [userChangeDate, setUserChangeDate]: any = useState({
    year: dayjs().year(),
    month: Number(dayjs().month()) + 1,
  });

  const fetchCalendarData = () => {
    employeeAttendanceCalenderApi({
      query: {
        year: userChangeDate?.year,
        month: userChangeDate?.month,
        uuid: userId || sessionStorage.getItem("userId"),
      },
    })
      .then((res: any) => {
        setCalendarData(res?.calendar_data);
        setTotalPresent(res?.total_present)
        setTotalAbsent(res?.total_absent)
       
       
      })
      .catch((err: any) => console.log("err", err));
  };

  useEffect(() => {
    fetchCalendarData();
  }, [userId, userChangeDate]);

  useEffect(() => {
    if (refetchState) {
      fetchCalendarData();
    }
  }, [refetchState]);

  const getStatusForDate = (date: string) => {
    const statuses = calendarData.filter((item: any) => item.date === date);
    if (statuses.length === 0) return "";
  
    const leaveStatus = statuses.find((item: any) => item.status === "Leave");
    if (leaveStatus) {
      let leaveType = leaveStatus.leave_type || "";
      if (leaveType === "Earned") leaveType = "EL";
      if (leaveType === "Sick") leaveType = "SL";
      return `${leaveType} Applied`;
    }
  
    return statuses[0].status || "";
  };
  
  

  const dateCellRender = (date: any) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const status = getStatusForDate(formattedDate);
  
    let borderColor = "";
    switch (true) {
      case status.endsWith("Applied"): 
        borderColor = "gold";
        break;
      case status === "Absent":
        borderColor = "lightcoral";                 
        break;
      case status === "Present":
        borderColor = "lightgreen";
        break;
      case status === "Week Off":
        borderColor = "lightgray";
        break;
        case status==="Half Day":
          borderColor="violet"
          break;
      default:
        borderColor = "transparent";
    }
  
    return (
      <div
        className="calendar-main"
        style={{
          border: `2px solid ${borderColor}`,
        }}
      >
        <div
          className="calendar-particular-date"
          style={{
            backgroundColor: borderColor,
          }}
        />
        <p className="calendar-text">{status}</p>
      </div>
    );
  };
  

  const onPanelChange = (value: any) => {
    setUserChangeDate({
      year: value.format("YYYY"),
      month: value.format("MM"),
    });
  };

  return (
    <div>
      <Calendar
        onPanelChange={onPanelChange}
        style={{ height: "380px", overflow: "auto" }}
        className="custom-calendar"
        cellRender={dateCellRender}
      />
    </div>
  );
};

export default EmployeeCalander;
