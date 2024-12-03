import React, { useState } from 'react'
import Sidebar from '../../ReuseableComponent/Sidebar'

const RegulariseAdmin = () => {
    const [regularisepopup,setRegularisePopup]:any=useState(false)
    const handleregularise=()=>{
        setRegularisePopup(!regularisepopup)
    }
    const closeregularise=()=>{
        setRegularisePopup(false)
    }
  return (
    <div className="flex">
        <Sidebar current={"Regularization"} />
        <div className="main-area">
          <div className="all-employees employees-detail">
            <div className="flex space-bw alc top-h">
              <h3>Regularization Requests</h3>
            </div>
            <table>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Date</th>
                <th>Reason</th>
                <th>View</th>
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
                   onClick={handleregularise}
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
        <div className="leave-taken" style={{display:regularisepopup?"block":"none"}}>
        <div className="on-leave">
          <div className="closeBtn">
            <i className="fa-solid fa-xmark" onClick={closeregularise}></i>
          </div>
          <h3>Regularization Request</h3>
          <div className="leave-form ">
            <div className='flex space-bw'>
            <div className="intime flex">
                <p>InTime</p>
                <span>9:00AM</span> 
            </div>
            <div className="intime flex">
                <p>OutTime</p>
                <span>9:00AM</span>
            </div>
            </div>
            <div className="selected-date flex alc">
              <label htmlFor="">Selected Date:</label>
              <p>22/09/2024</p>
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
      </div>
        
  )
}

export default RegulariseAdmin
