import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { globalUserType } from "../JotaiStore";
import { userLogoutApi } from "../store/Services";
import { toast } from "react-hot-toast";

const menuTab: any = [
  {
    name: "Dashboard",
    icon: "fa-solid fa-house",
  },
  {
    name: "Employees",
    icon: "fa-solid fa-users",
  },
  {
    name: "Leaves",
    icon: "fa-solid fa-person-through-window",
  },
  {
    name: "Anouncement",
    icon: "fa-solid fa-bullhorn",
  },
  {
    name: "Attendance Management",
    icon: "fa-solid fa-calendar-days",
  },
  {
    name: "Regularization",
    icon: "fa-solid fa-clock",
  },
  {
    name: "Logout",
    icon: "fa-solid fa-right-from-bracket",
  },
];
const Sidebar = ({ current }: any) => {
  const [logoutModal, setLogoutModal]: any = useState(false);
  const [, setGlobalUserTypeAtom]: any = useAtom(globalUserType);
  const navigate = useNavigate();

  const tabChangeHandler = (val: any) => {
    if (val === "Dashboard") {
      navigate("/");
    } else if (val === "Employees") {
      navigate("/employees");
    } else if (val === "Leaves") {
      navigate("/leaves");
    } else if (val === "Attendance Management") {
      navigate("/attendancemanage");
    } else if (val === "Logout") {
      setLogoutModal(true);
    } else if (val === "Anouncement") {
      navigate("/anouncement");
    } else if (val === "Regularization") {
      navigate("/regulariseadmin");
    }
  };

  const handleLogoutConfirm = () => {
    userLogoutApi()
      .then(() => {
        setGlobalUserTypeAtom(null);
        sessionStorage.clear();
        toast.success("Logout user successfully");
        setTimeout(() => {
          if (!window.location.pathname.includes("login")) {
            window.location.reload();
          }
        }, 300);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
    setLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setLogoutModal(false);
  };
  return (
    <div className="sidebar">
      <ul>
        {menuTab.map((item: any) => (
          <li
            key={item.name}
            className={`${current === item.name ? "active" : ""}`}
            onClick={() => tabChangeHandler(item.name)}
          >
            <i className={item.icon}></i>
            {item.name}
          </li>
        ))}
      </ul>
      {logoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button onClick={handleLogoutCancel} className="confirm-btn">
                No
              </button>
              <button onClick={handleLogoutConfirm} className="cancel-btn">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
