import React from 'react'
import './Dashboard.css';
import Sidebar from '../../ReuseableComponent/Sidebar';

const EmployeeTab = () => {
    return (
        <>
            <div className="flex">
                <Sidebar current={"Employees"} />
                <div className="main-area">
                    <div className="all-employees employees-detail">
                        <div className="flex space-bw alc top-h">
                            <h3>Employees Details</h3>
                            <div className='pos-relate'>
                                <input type="text" name="" id="" placeholder='Enter Employee Name' />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>In Time</th>
                                <th>Out Time</th>
                                <th>Total Hours</th>
                                <th>Options</th>
                            </tr>
                            <tr>
                                <td>Harsh</td>
                                <td>Front end developer</td>
                                <td>IT</td>
                                <td>10:00 AM</td>
                                <td>07:00 PM</td>
                                <td>09:00 Hrs</td>
                                <td>
                                    <div className="flex alc just-center">
                                        <button className='view'><i className="fa-solid fa-eye"></i></button>
                                        <button className='edit'><i className="fa-solid fa-user-pen"></i></button>
                                        <button className='delete'><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Harish</td>
                                <td>Full stack developer</td>
                                <td>IT</td>
                                <td>10:00 AM</td>
                                <td>07:00 PM</td>
                                <td>09:00 Hrs</td>
                                <td>
                                    <div className="flex alc just-center">
                                        <button className='view'><i className="fa-solid fa-eye"></i></button>
                                        <button className='edit'><i className="fa-solid fa-user-pen"></i></button>
                                        <button className='delete'><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeTab