import React from 'react'
import Sidebar from '../../ReuseableComponent/Sidebar'
import Calendar from 'react-calendar';
import { useState } from 'react';

const AttendanceManage = () => {
 
  return (
    <div className="flex">
    <Sidebar current={"Attendance Management"} />
    <div className="main-area">
        <div className="all-employees employees-detail">
            <div className="flex space-bw alc top-h">
                <h3>Attendance Details</h3>
                <div className="from">
                    <label htmlFor="">From</label>
                    <input type="date" />
                </div>
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
                    <td><i className="fa-solid fa-eye"></i></td>
                </tr>
                <tr>
                    <td>Harish</td>
                    <td>Full stack developer</td>
                    <td>IT</td>
                    <td>5</td>
                    <td>2.5</td>
                    <td>28/11/2024</td>
                    <td>Cousin Marriage</td>
                    <td><i className="fa-solid fa-eye"></i></td>
                </tr>
            </table>
        </div>
    </div>
</div>
  )
}

export default AttendanceManage
