import React, { useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";
import DashboardEmp from "../Employees/DashboardEmp";
import EmpTabForAdmin from "../../ReuseableComponent/EmpTabForAdmin";
import ApplyLeave from "../Employees/ApplyLeave";
import ViewAttendaceEmp from "../Employees/ViewAttendaceEmp";
import ProfileEmp from "../Employees/ProfileEmp";

const EmployeeView = () => {
  const [activeTab, setActiveTab]: any = useState("Dashboard");

  return (
    <div className="flex">
      <Sidebar current={"Employees"} />
      <div className="main-area">
        <EmpTabForAdmin activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Dashboard" ? (
          <DashboardEmp />
        ) : activeTab === "Apply Leave" ? (
          <ApplyLeave/>
        ) : activeTab === "View Attendance" ? (
         <ViewAttendaceEmp/>
       
   
        ) : (
          <ProfileEmp/>
        )}
      </div>
    </div>
  );
};

export default EmployeeView;
