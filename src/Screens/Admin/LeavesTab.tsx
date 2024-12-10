import React, { useState } from "react";
import Sidebar from "../../ReuseableComponent/Sidebar";

const LeavesTab = () => {
  const [openLeave, setOpenLeaves] = useState(false);

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
                <label htmlFor="">Leave Type</label>
                <select name="" id="">
                  <option value="">Earned Leave</option>
                  <option value="">Sick Leave</option>
                </select>
              </div>
              <div className="employee-name">
        <label htmlFor="">Choose Leave Option</label>
        <select name="" id="">
          <option value="">Half Day</option>
          <option value="">Full Day</option>
        </select>
      </div>
      <div className="leave-duration flex space-bw ">
        <div className="duration-from">
        <label htmlFor="">From</label>
        <input type="date" />
        </div>
        <div className="duration-from">
        <label htmlFor="">To</label>
        <input type="date" />
        </div>
        
      
       
      </div>
              <div>
                <label htmlFor="">Reason</label>
                <textarea name="" id="" rows={5}></textarea>
              </div>
              <div className="flex space-bw">
                <button className="approve">Approve</button>
                <button>Dis-Approve</button>
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
                <th>Department</th>
                <th>Avl. EL</th>
                <th>Avl. SL</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Option</th>
              </tr>
              <tr>
                <td>Harsh</td>
                <td>Front end developer</td>
                <td>IT</td>
                <td>5</td>
                <td>2.5</td>
                <td>28/11/2024</td>
                <td>Cousin Marriage</td>
                <td>
                  <i
                    className="fa-solid fa-eye"
                    onClick={() => setOpenLeaves(true)}
                  ></i>
                </td>
              </tr>
              <tr>
                <td>Harish</td>
                <td>Full stack developer</td>
                <td>IT</td>
                <td>5</td>
                <td>2.5</td>
                <td>28/11/2024</td>
                <td>Cousin Marriage</td>
                <td>
                  <i className="fa-solid fa-eye"></i>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeavesTab;
