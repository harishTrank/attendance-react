import React, { useEffect, useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";
import { approveRejectApiApi, listLeaveRequestApi } from "../../store/Services";
import { Pagination } from "antd";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const LeavesTab = () => {
  const [openLeave, setOpenLeaves] = useState(false);
  const [apiResponse, setApiResponse]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const [currentObj, setCurrentObj]: any = useState({});

  const fetchListAnouncementApi = () => {
    listLeaveRequestApi({
      query: {
        page: currentPage,
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

  const approveRejectHandler = (val: any) => {
    approveRejectApiApi({
      body: {
        leave_id: currentObj?.id,
        status: val,
      },
    })
      .then((res: any) => {
        toast.success(`${val} request successfully.`);
        setOpenLeaves(false);
        fetchListAnouncementApi();
      })
      .catch((err: any) => {
        toast.error(`Something went wrong.`);
        setOpenLeaves(false);
      });
  };

  return (
    <>
      {openLeave && (
        <div className="leave-taken">
          <div className="on-leave">
            <div className="closeBtn" onClick={() => setOpenLeaves(false)}>
              <i className="fa-solid fa-xmark"></i>
            </div>
            <h3>Why on leave reason?</h3>
            <div className="leave-form">
              <div>
                <label>Leave Type</label>
                <select>
                  <option>{currentObj?.leave_type} Leave</option>
                </select>
              </div>
              {/* <div className="employee-name">
                <label htmlFor="">Choose Leave Option</label>
                <select name="" id="">
                  <option value="">Half Day</option>
                  <option value="">Full Day</option>
                </select>
              </div> */}
              <div className="leave-duration flex space-bw ">
                <div className="duration-from-leaves">
                  <label>From</label>
                  <input type="date" readOnly value={currentObj?.from_date} />
                </div>
                <div className="duration-from-leaves">
                  <label>To</label>
                  <input type="date" readOnly value={currentObj?.to_date} />
                </div>
              </div>
              <div className="flex space-bw ">
                <div className=" leave-name">
                  <label>Employeee Name</label>
                <p>{currentObj?.leave_user__first_name} {currentObj?.leave_user__last_name}</p>
                </div>
                <div className=" leave-name">
                  <label>Role</label>
                 <p>{currentObj?.leave_user__designation}</p>
                </div>
              </div>
              <div>
                <label>Reason</label>
                <textarea rows={5} readOnly value={currentObj?.reason} />
              </div>
              <div className="flex space-bw">
                <button
                  className="approve"
                  onClick={() => approveRejectHandler("Approved")}
                  disabled={currentObj?.status !== "Pending"}
                >
                  Approve
                </button>
                <button
                  disabled={currentObj?.status !== "Pending"}
                  onClick={() => approveRejectHandler("Rejected")}
                >
                  Dis-Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex">
        <Sidebar current={"Leaves"} />
        <div className="main-area">
          <div className="all-employees employees-detail">
            <div className="flex space-bw alc top-h">
              <h3>Leaves Details</h3>
            </div>
            <table>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Apply Date</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
                <th>Option</th>
              </tr>

              {apiResponse?.map((item: any) => (
                <tr key={item?.id}>
                  <td>
                    {item?.leave_user__first_name} {item?.leave_user__last_name}
                  </td>
                  <td>{item?.leave_user__designation}</td>
                  <td>{dayjs(item?.created_at).format("YYYY-MM-DD")}</td>
                  <td>{item?.from_date}</td>
                  <td>{item?.to_date}</td>
                  <td>{item?.status}</td>
                  <td
                    onClick={() => {
                      setOpenLeaves(true);
                      setCurrentObj(item);
                    }}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </td>
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
    </>
  );
};

export default LeavesTab;
