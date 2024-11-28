import React, { useState } from 'react'
import './Dashboard.css';
import Linechart from '../ReuseableComponent/Linechart';
import Barchart from '../ReuseableComponent/Barchat';

const menuTab: any = [
    {
        name: "Dashboard",
        icon: "fa-solid fa-house"
    },
    {
        name: "Employees",
        icon: "fa-solid fa-users"
    },
    {
        name: "Leaves",
        icon: "fa-solid fa-person-through-window"
    },
]

const Dashboard = () => {

    const [activeTab, setActiveTab] = useState("Dashboard");

    return (
        <>
            <header></header>
            <div className='flex'>
                <div className="sidebar">
                    <ul>
                        {menuTab.map((item: any) => (
                            <li className={`${activeTab === item.name ? "active" : ""}`} onClick={() => setActiveTab(item.name)}>
                                <i className={item.icon}></i>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="main-area">
                    <div className="stat-info">
                        <div className="stat-cards">
                            <div className="icon">
                                <i className="fa-solid fa-basket-shopping"></i>
                            </div>
                            <p>Total Employees</p>
                            <h3>150</h3>
                        </div>
                        <div className="stat-cards">
                            <div className="icon green">
                                <i className="fa-solid fa-bag-shopping"></i>
                            </div>
                            <p>Present</p>
                            <h3>70</h3>
                        </div>
                        <div className="stat-cards">
                            <div className="icon red">
                                <i className="fa-solid fa-bag-shopping"></i>
                            </div>
                            <p>Absent</p>
                            <h3>05</h3>
                        </div>
                        <div className="stat-cards">
                            <div className="icon pink">
                                <i className="fa-solid fa-dollar-sign"></i>
                            </div>
                            <p>Week Off</p>
                            <h3>10</h3>
                        </div>
                    </div>
                    <div className="attendance-charts flex alc space-bw">
                        <div className="line-chart col-60">
                            <Linechart />
                        </div>
                        <div className="bar-chart col-40">
                            <Barchart />
                        </div>
                    </div>
                    <div className="all-employees">
                        <h3>Attendance Overview</h3>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>In Time</th>
                                <th>Out Time</th>
                                <th>Total Hours</th>
                            </tr>
                            <tr>
                                <td>Harsh</td>
                                <td>Front end developer</td>
                                <td>IT</td>
                                <td>10:00 AM</td>
                                <td>07:00 PM</td>
                                <td>09:00 Hrs</td>
                            </tr>
                            <tr>
                                <td>Harsh</td>
                                <td>Front end developer</td>
                                <td>IT</td>
                                <td>10:00 AM</td>
                                <td>07:00 PM</td>
                                <td>09:00 Hrs</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;