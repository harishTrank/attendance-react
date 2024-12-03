import React from 'react'
import { FaUserCircle } from "react-icons/fa";

const ProfileEmp = () => {
  return (
    <div className="all-employees profile-main">
          <div className='profile-page'>
            <div className="profile-upper flex alc">
            <div className="user-picture">
            <FaUserCircle size={60}/>
          </div>
          <div className="userfinalname">
            <p>Pranav Kumar</p>
            <p>Pranav@gmail.com</p>
          </div>
            </div>
       
           
            
            <div className="flex space-bw alc " >
            <div className="form-group" >
              <label>First Name</label>
              <p>Pranav</p>
            </div>
            <div className="form-group">
              <label>Last Name</label>
             <p>Kumar</p>
            </div>
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Email</label>
           <p>Pranav@1234</p>
            </div>
            <div className="form-group">
              <label >Contact</label>
             <p>123456789</p>
            </div>
            
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Gender</label>
            <p>Male</p>
            </div>
            <div className="form-group">
              <label >Date of Birth</label>
              <p>22/09/2001</p>
            </div>
            
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Date of Joining</label>
             <p>22/09/2001</p>
            </div>
            <div className="form-group">
              <label >Designation</label>
             <p>Frontend Developer</p>
            </div>
            
            </div>
            <div className="form-group-textarea">
              <label>Address</label>
             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat nemo neque excepturi!</p>
            </div>
           
            {/* <div className="form-actions">
              <button >Submit</button>
              <button >Cancel</button>
            </div> */}
          </div>
        </div>
  )
}

export default ProfileEmp
