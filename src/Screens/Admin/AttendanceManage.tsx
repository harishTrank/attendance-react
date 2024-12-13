import React, { useEffect, useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";
import { attendanceManagementApi, downloadCsvApi } from "../../store/Services";
import { Pagination } from "antd";

const AttendanceManage = () => {
  const [apiResponse, setApiResponse]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const [toDateSearch, setToDateSearch]: any = useState(undefined);
  const [fromDateSearch, setFromDateSearch]: any = useState(undefined);
  const [search, setSearch]: any = useState("");

  const fetchListAnouncementApi = () => {
    attendanceManagementApi({
      query: {
        page: currentPage,
        name: search,
        from_date: fromDateSearch,
        to_date: toDateSearch,
      },
    })
      .then((res: any) => {
        setTotalPages(res?.total_pages || 0);
        setApiResponse(res?.results);
      })
      .catch((err: any) => console.log("err", err));
  };

  useEffect(() => {
    setTimeout(() => {
      fetchListAnouncementApi();
    }, 300);
  }, [currentPage, toDateSearch, fromDateSearch, search]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleDownloadcsv = () => {
    downloadCsvApi({
      query: {
        page: currentPage,
        name: search,
        from_date: fromDateSearch,
        to_date: toDateSearch,
      },
    })
      .then((csvData) => {
        const downloadCSV = (data: any, filename: any) => {
          const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
  
       
        downloadCSV(csvData, "employee_leave_data.csv");
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
      });
  };
  
  

  return (
    <div className="flex">
      <Sidebar current={"Attendance Management"} />
      <div className="main-area">
        <div className="all-employees">
          <div className="search-section flex alc space-bw">
            <div className="flex alc">
              <div className="from">
                <label htmlFor="">From</label>
                <input
                  type="date"
                  value={fromDateSearch}
                  onChange={(e: any) => setFromDateSearch(e.target.value)}
                />
              </div>
              <div className="to">
                <label>To</label>
                <input
                  type="date"
                  value={toDateSearch}
                  onChange={(e: any) => setToDateSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="csvdownload-btn">
              <button onClick={handleDownloadcsv}>
                <i className="fa-solid fa-envelope-open-text" />
                &nbsp;Download csv
              </button>
            </div>
          </div>
        </div>
        <div className="all-employees employees-detail">
          <div className="flex space-bw alc top-h">
            <h3>Attendance</h3>
            <div className="pos-relate">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
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
    </div>
  );
};

export default AttendanceManage;
