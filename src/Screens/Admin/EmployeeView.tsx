import React, { useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";
import DashboardEmp from "../Employees/DashboardEmp";
import EmpTabForAdmin from "../../ReuseableComponent/EmpTabForAdmin";
import ApplyLeave from "../Employees/ApplyLeave";
import ViewAttendaceEmp from "../Employees/ViewAttendaceEmp";
import ProfileEmp from "../Employees/ProfileEmp";
import { useLocation } from "react-router-dom";
import RegulariseEmp from "../Employees/RegulariseEmp";
import { userLogoutApi } from "../../store/Services";
import { globalUserType } from "../../JotaiStore";
import { useAtom } from "jotai";
import { toast } from "react-hot-toast";

const EmployeeView = () => {
  const [activeTab, setActiveTab]: any = useState("Dashboard");
  const { pathname } = useLocation();
  const [logoutEmp, setLogoutEmp]: any = useState(false);
  const [, setGlobalUserTypeAtom]: any = useAtom(globalUserType);

  const handleLogoutEmp = (action: any) => {
    if (action === "cancel") {
      setLogoutEmp(false); // Close the popup
    } else if (action === "confirm") {
      userLogoutApi()
        .then(() => {
          setGlobalUserTypeAtom(null);
          sessionStorage.clear();
          toast.success("Logout user successfully");
        })
        .catch((err: any) => {
          console.log("err", err);
        });
      setLogoutEmp(false);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === "Logout") {
      setLogoutEmp(true);
    } else {
      setActiveTab(tab);
    }
  };

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
          setActiveTab={handleTabChange} // Use the updated handler
        />
        {activeTab === "Dashboard" ? (
          <DashboardEmp />
        ) : activeTab === "Apply Leave" ? (
          <ApplyLeave />
        ) : activeTab === "View Attendance" ? (
          <ViewAttendaceEmp />
        ) : activeTab === "Regularization" ? (
          <RegulariseEmp />
        ) : activeTab === "Profile" ? (
          <ProfileEmp />
        ) : null}
      </div>
      {logoutEmp && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button
                onClick={() => handleLogoutEmp("cancel")}
                className="confirm-btn"
              >
                No
              </button>
              <button
                onClick={() => handleLogoutEmp("confirm")}
                className="cancel-btn"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeView;
