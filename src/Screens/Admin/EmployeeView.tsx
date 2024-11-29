import React, { useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";
import DashboardEmp from "../Employees/DashboardEmp";
import EmpTabForAdmin from "../../ReuseableComponent/EmpTabForAdmin";

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
          <p>Apply leave</p>
        ) : activeTab === "View Attendance" ? (
          <p>View Attendance</p>
        ) : (
          <p>Profile</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeView;
