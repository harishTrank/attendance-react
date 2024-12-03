const adminTab: any = [
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
    name: "Regularization",
    icon: "fa-solid fa-clock",
  },
  {
    name: "Profile",
    icon: "fa-solid fa-user-tie",
  },
];

const employeeTab = [
  ...adminTab,
  {
    name: "Logout",
    icon: "fa-solid fa-user-tie",
  },
];
const EmpTabForAdmin = ({ activeTab, setActiveTab, pathname }: any) => {
  const tabChangeHandler = (val: any) => {
    setActiveTab(val);
  };
  return (
    <div className="sidebar-emp ">
      <div className="upper-tabs">
        <ul className="flex">
          {(pathname.includes("dashboard") ? employeeTab : adminTab).map(
            (item: any) => (
              <li
                key={item.name}
                className={`${activeTab === item.name ? "active" : ""}`}
                onClick={() => tabChangeHandler(item.name)}
              >
                <i className={item.icon}></i>&nbsp;
                {item.name}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default EmpTabForAdmin;
