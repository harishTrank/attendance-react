import React from 'react'

const ProfileEmp = () => {
  return (
    <div className="all-employees">
          <div className='profile-page'>
           
            <h2>Employee Profile</h2>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
               
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                
                required
              />
            </div>
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
              
                required
              />
            </div>
            <div className="form-group">
              <label >Contact</label>
              <input type="text" />
            </div>
            
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Gender</label>
             <select name="" id="">
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Others</option>
             </select>
            </div>
            <div className="form-group">
              <label >Date of Birth</label>
              <input type="date" />
            </div>
            
            </div>
            <div className="flex space-bw alc">
            <div className="form-group">
              <label>Date of Joining</label>
             <input type="date" />
            </div>
            <div className="form-group">
              <label >Profile</label>
              <input type="text" />
            </div>
            
            </div>
            <div className="form-group-textarea">
              <label>Address</label>
              <textarea name="" id="" rows={4} cols={50}></textarea>
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
