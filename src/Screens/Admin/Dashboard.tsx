import "./Dashboard.css";
import Linechart from "../../ReuseableComponent/Linechart";
import Sidebar from "../../ReuseableComponent/Sidebar";
import PieChartAdmin from "../../ReuseableComponent/PieChartAdmin";
import { useEffect, useState } from "react";
import {
  adminDashboardAttendanceApi,
  getAllAttendanceApi,
} from "../../store/Services";
import { Pagination } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Dashboard = () => {
  const [attendanceList, setAttendanceList]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const [userAttendance, setUserAttendace]: any = useState({});
  const fetchListAttendanceApi = () => {
    getAllAttendanceApi({
      query: {
        uuid: sessionStorage.getItem("userId"),
        page: currentPage,
      },
    })
      .then((res: any) => {
        setTotalPages(res?.total_pages || 0);
        setAttendanceList(res?.results);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchListAttendanceApi();
  }, [currentPage]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    adminDashboardAttendanceApi()
      .then((res: any) => {
        setUserAttendace(res);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }, []);
  return (
    <>
      <div className="flex just-start">
        <Sidebar current={"Dashboard"} />
        <div className="main-area">
          <div className="stat-info">
            <div className="stat-cards">
              <div className="icon">
                <i className="fa-solid fa-basket-shopping"></i>
              </div>
              <p>Total Employees</p>
              <h3>{userAttendance?.total}</h3>
            </div>
            <div className="stat-cards">
              <div className="icon green">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <p>Present</p>
              <h3>{userAttendance?.present}</h3>
            </div>
            <div className="stat-cards">
              <div className="icon red">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <p>Absent</p>
              <h3>{userAttendance?.absent}</h3>
            </div>
            <div className="stat-cards">
              <div className="icon pink">
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
              <p>Week Off</p>
              <h3>{userAttendance?.weekoff}</h3>
            </div>
          </div>
          <div className="attendance-charts flex alc space-bw">
            <div className="line-chart col-60">
              <Linechart />
            </div>
            <div className="bar-chart col-40">
              <PieChartAdmin userAttendance={userAttendance} />
            </div>
          </div>
          <div className="all-employees">
            <h3>Attendance Overview</h3>
            <table>
              <thead>
                <tr>
                  <th>Employee Code</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Date</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((item: any) => (
                  <tr key={item?.id}>
                    <td>{item?.attendance_user__emp_code}</td>
                    <td>
                      {item?.attendance_user__first_name}{" "}
                      {item.attendance_user__last_name}
                    </td>
                    <td>{item?.attendance_user__designation}</td>
                    <td>{dayjs(item?.in_time).format("DD/MM/YYYY")}</td>
                    <td>{dayjs(item?.in_time).format("hh:mm:ss A")}</td>
                    <td>
                      {item?.out_time
                        ? dayjs(item?.out_time).format("hh:mm:ss A")
                        : "--"}
                    </td>
                    <td>{item?.duration?.split(".")?.[0] || "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dashboard-pagination">
          {totalPages > 1 && (
            <Pagination
              current={currentPage}
              total={totalPages * 10}
              onChange={onPageChange}
              showSizeChanger={false}
              align="center"
            />
          )}
          </div>
       
        </div>
      </div>
    </>
  );
};

export default Dashboard;
