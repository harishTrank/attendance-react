




const tabData: any = [
  {
    name: "Dashboard",
    icon: "fa-solid fa-house",
  },
  {
    name: "Apply Leave",
    icon: "fa-solid fa-calendar-check",
  },
  {
    name: "View Attendance",
    icon: "fa-solid fa-clipboard-user",
  },
  {
    name: "Profile",
    icon: "fa-solid fa-user-tie",
  },
  {
    name:"Regularization",
    icon:"fa-solid fa-clock"
  },
];
const EmpTabForAdmin = ({ activeTab, setActiveTab }: any) => {
  const tabChangeHandler = (val: any) => {
    setActiveTab(val);
  };
  return (
    <div className="sidebar-emp ">
      <div className="upper-tabs">
      <ul className="flex">
        {tabData.map((item: any) => (
          <li
            key={item.name}
            className={`${activeTab === item.name ? "active" : ""}`}
            onClick={() => tabChangeHandler(item.name)}
          >
            <i className={item.icon}></i>&nbsp;
            {item.name}
          </li>
        ))}
      </ul>
      </div>
     
    </div>
  );
};

export default EmpTabForAdmin;
