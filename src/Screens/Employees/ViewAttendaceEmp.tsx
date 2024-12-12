import React, { useEffect, useState } from "react";
import { attendanceManagementApi } from "../../store/Services";
import { Pagination } from "antd";

const ViewAttendaceEmp = ({ userId }: any) => {
  const [apiResponse, setApiResponse]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const fetchListAnouncementApi = () => {
    attendanceManagementApi({
      query: {
        page: currentPage,
        uuid: userId || sessionStorage.getItem("userId"),
      },
    })
      .then((res: any) => {
        setTotalPages(res?.total_pages || 0);
        setApiResponse(res?.results);
      })
      .catch((err: any) => console.log("err", err));
  };

  useEffect(() => {
    fetchListAnouncementApi();
  }, [currentPage]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="all-employees">
        <div className="search-section flex alc space-bw">
          <div className="flex alc">
            <div className="from">
              <label htmlFor="">From</label>
              <input type="date" />
            </div>
            <div className="to">
              <label htmlFor="">To</label>
              <input type="date" />
            </div>
          </div>
          <div className="csvdownload-btn">
            <button>
              <i className="fa-solid fa-envelope-open-text" />
              &nbsp;Download csv
            </button>
          </div>
        </div>
      </div>
      <div className="all-employees employees-detail">
        <div className="flex space-bw alc top-h">
          <h3>Employee Attendance</h3>
          <div className="pos-relate">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter Employee Name"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <table>
          <tr>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Days worked</th>
            <th>LOP</th>
            <th>Week Off</th>
            <th>EL Applied</th>
            <th>SL Applied</th>
            <th>EL/SL Avl.</th>
          </tr>
          {apiResponse?.map((item: any) => (
            <tr>
              <td>{item?.Employee_Name}</td>
              <td>{item?.Designation}</td>
              <td>{item?.Days_Worked}</td>
              <td>{item?.lop}</td>
              <td>{item?.Week_Off}</td>
              <td>{item?.EL_Applied}</td>
              <td>{item?.SL_Applied}</td>
              <td>{item?.EL_SL_Available}</td>
            </tr>
          ))}
        </table>
      </div>
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
  );
};

export default ViewAttendaceEmp;
