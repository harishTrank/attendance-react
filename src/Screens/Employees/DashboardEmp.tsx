import { useEffect, useState } from "react";
import AnounceMentList from "../../ReuseableComponent/AnounceMentList";
import ClockInOutComp from "../../ReuseableComponent/ClockInOutComp";
import EmployeeCalander from "../../ReuseableComponent/EmployeeCalander";
import {
  employeeCountsCalenderApi,
  getAllAttendanceApi,
} from "../../store/Services";
import { Pagination } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const DashboardEmp = ({ userId }: any) => {
  const [attendanceList, setAttendanceList]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const [refetchState, setRefetchState]: any = useState(false);
  const [countResults, setCountResults]: any = useState({});

  const fetchListAttendanceApi = () => {
    getAllAttendanceApi({
      query: {
        uuid: userId || sessionStorage.getItem("userId"),
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
  }, [userId, currentPage]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (refetchState) {
      setCurrentPage(1);
      fetchListAttendanceApi();
      setRefetchState(false);
    }
  }, [refetchState]);

  useEffect(() => {
    employeeCountsCalenderApi({
      query: {
        uuid: userId || sessionStorage.getItem("userId"),
      },
    })
      .then((res: any) => {
        setCountResults(res?.response_data);
      })
      .catch((err: any) => console.log("err", err));
  }, [userId]);

  return (
    <>
      <div className="stat-info">
        <div className="stat-cards">
          <div className="icon">
            <i className="fa-solid fa-basket-shopping"></i>
          </div>
          <p>Total Present</p>
          <h3>{countResults?.total_present}</h3>
        </div>
        <div className="stat-cards">
          <div className="icon green">
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
          <p>Total Absent</p>
          <h3>{countResults?.total_absent}</h3>
        </div>
        <div className="stat-cards">
          <div className="icon red">
            <i className="fa-solid fa-bag-shopping"></i>
          </div>
          <p>Total Leave Balance</p>
          <h3>{countResults?.total_leave_balance}</h3>
        </div>
        <div className="stat-cards">
          <div className="icon pink">
            <i className="fa-solid fa-dollar-sign"></i>
          </div>
          <p>Total Used Leave</p>
          <h3>{countResults?.total_used_leave}</h3>
        </div>
      </div>
      <div className="attendance-charts flex alc space-bw">
        <div className="line-chart col-60">
          <EmployeeCalander userId={userId} refetchState={refetchState} />
        </div>
        <div className="bar-chart col-40">
          <ClockInOutComp userId={userId} setRefetchState={setRefetchState} />
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
            {attendanceList.length > 0 ? (
              attendanceList.map((item: any) => (
                <tr key={item?.id}>
                  <td>{item?.attendance_user__emp_code}</td>
                  <td>
                    {item?.attendance_user__first_name}{" "}
                    {item?.attendance_user__last_name}
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
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  No records found
                </td>
              </tr>
            )}
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

      <AnounceMentList />
    </>
  );
};

export default DashboardEmp;
