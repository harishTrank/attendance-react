import React, { useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";
import DashboardEmp from "../Employees/DashboardEmp";
import EmpTabForAdmin from "../../ReuseableComponent/EmpTabForAdmin";
import ApplyLeave from "../Employees/ApplyLeave";
import ViewAttendaceEmp from "../Employees/ViewAttendaceEmp";
import ProfileEmp from "../Employees/ProfileEmp";
import { useLocation } from "react-router-dom";
import RegulariseEmp from "../Employees/RegulariseEmp";

const EmployeeView = () => {
  const [activeTab, setActiveTab]: any = useState("Dashboard");
  const { pathname } = useLocation();

  return (
    <div className="flex">
      {!pathname.includes("dashboard") && <Sidebar current={"Employees"} />}
      <div
        className="main-area"
        style={{
          width: pathname.includes("dashboard") ? "100%" : "calc(100% - 200px)",
        }}
      >
        <EmpTabForAdmin
          pathname={pathname}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === "Dashboard" ? (
          <DashboardEmp />
        ) : activeTab === "Apply Leave" ? (
          <ApplyLeave />
        ) : activeTab === "View Attendance" ? (
          <ViewAttendaceEmp />
        ) : activeTab === "Regularization" ? (
          <RegulariseEmp />
        ) : (
          <ProfileEmp />
        )}
      </div>
    </div>
  );
};

export default EmployeeView;
