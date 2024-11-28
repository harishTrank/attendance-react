import React, { useState } from "react";

const tabData: any = [
  {
    name: "Dashboard",
    icon: "fa-solid fa-house",
  },
  {
    name: "Apply Leave",
    icon: "fa-solid fa-house",
  },
  {
    name: "View Attendance",
    icon: "fa-solid fa-house",
  },
  {
    name: "Profile",
    icon: "fa-solid fa-house",
  },
];
const EmpTabForAdmin = ({ activeTab, setActiveTab }: any) => {
  const tabChangeHandler = (val: any) => {
    setActiveTab(val);
  };
  return (
    <div className="sidebar-emp">
      <ul>
        {tabData.map((item: any) => (
          <li
            key={item.name}
            className={`${activeTab === item.name ? "active" : ""}`}
            onClick={() => tabChangeHandler(item.name)}
          >
            <i className={item.icon}></i>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpTabForAdmin;
