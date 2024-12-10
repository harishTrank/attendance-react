import React, { useEffect, useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";
import { listRegularizationApi } from "../../store/Services";
import { Pagination } from "antd";

const RegulariseAdmin = () => {
  const [regularisepopup, setRegularisePopup]: any = useState(false);
  const [regularList, setRegularList]: any = useState([]);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const [currentObj, setCurrentObj]: any = useState({});

  const handleregularise = (obj: any) => {
    setRegularisePopup(!regularisepopup);
    setCurrentObj(obj);
  };
  const closeregularise = () => {
    setRegularisePopup(false);
  };

  const fetchAllRegularization = () => {
    listRegularizationApi({
      query: {
        page: currentPage,
      },
    })
      .then((res: any) => {
        setTotalPages(res?.total_pages || 0);
        setRegularList(res?.results);
      })
      .catch((err: any) => console.log("err", err));
  };

  useEffect(() => {
    fetchAllRegularization();
  }, [currentPage]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <Sidebar current={"Regularization"} />
      <div className="main-area">
        <div className="all-employees employees-detail">
          <div className="flex space-bw alc top-h">
            <h3>Regularization Requests</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Date</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {regularList.map((item: any) => (
                <tr key={item?.id}>
                  <td>
                    {item?.user_regularization__first_name}{" "}
                    {item?.user_regularization__last_name}
                  </td>
                  <td>{item?.user_regularization__designation}</td>
                  <td>{item?.in_time}</td>
                  <td>{item?.out_time}</td>
                  <td>{item?.date}</td>
                  <td>
                    {item?.approval ? (
                      <i
                        style={{ color: "green" }}
                        className="fa-solid fa-check"
                      />
                    ) : (
                      <i
                        style={{ color: "red" }}
                        className="fa-solid fa-xmark"
                      />
                    )}
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => handleregularise(item)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
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
      <div
        className="leave-taken"
        style={{ display: regularisepopup ? "block" : "none" }}
      >
        <div className="on-leave">
          <div className="closeBtn">
            <i className="fa-solid fa-xmark" onClick={closeregularise}></i>
          </div>
          <h3>Regularization Request</h3>
          <div className="leave-form ">
            <div className="flex space-bw">
              <div className="intime flex">
                <p>InTime</p>
                <span>{currentObj?.in_time}</span>
              </div>
              <div className="intime flex">
                <p>OutTime</p>
                <span>{currentObj?.out_time}</span>
              </div>
            </div>
            <div className="selected-date flex alc">
              <label htmlFor="">Selected Date:</label>
              <p>{currentObj?.date}</p>
            </div>

            <div>
              <label htmlFor="">Reason</label>
              <textarea value={currentObj?.reason} rows={5}></textarea>
            </div>
            <div className="flex space-bw">
              <button className="approve">Approve</button>
              <button>Dis-Approve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulariseAdmin;
