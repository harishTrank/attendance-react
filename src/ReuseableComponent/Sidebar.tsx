import React from "react";
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
    name: "Logout",
    icon: "fa-solid fa-right-from-bracket",
  },
];
const Sidebar = ({ current }: any) => {
  const navigate = useNavigate();

  const tabChangeHandler = (val: any) => {
    if (val === "Dashboard") {
      navigate("/");
    } else if (val === "Employees") {
      navigate("/employees");
    } else if (val === "Leaves") {
      navigate("/leaves");
    }
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
    </div>
  );
};

export default Sidebar;
