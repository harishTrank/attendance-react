import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    name: "Announcement",
    icon: "fa-solid fa-bullhorn",
  },
  {
    name: "Attendance Management",
    icon: "fa-solid fa-calendar-days",
  },
  {
    name: "Logout",
    icon: "fa-solid fa-right-from-bracket",
  },
];
const Sidebar = ({ current }: any) => {
  const [logoutModal,setLogoutModal]:any=useState(false)
  const navigate = useNavigate();

  const tabChangeHandler = (val: any) => {
    if (val === "Dashboard") {
      navigate("/");
    } else if (val === "Employees") {
      navigate("/employees");
    } else if (val === "Leaves") {
      navigate("/leaves");
    }else if(val==='Attendance Management'){
      navigate('/attendancemanage')
    }else if(val==="Logout"){
      setLogoutModal(true)
    }
  };

const handleLogoutConfirm = () => {
  
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
              <button onClick={handleLogoutConfirm} className="confirm-btn">
                Yes
              </button>
              <button onClick={handleLogoutCancel} className="cancel-btn">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;