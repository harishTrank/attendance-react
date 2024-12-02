import React from 'react'

const ApplyLeave = () => {
  return (
    <div className="Leave-component">
    <div className="leave-content">
    <h3>Apply Leave</h3>
    <div className="leave-available flex space-bw">
      <div className="el-available">
        <p>EL Available:3</p>
      </div>
      <div className="sl-available">
        <p>SL Available:3</p>
      </div>
    </div>
    <div className="employee-details">
      <div className="employee-name">
        <label htmlFor="">Employee Name</label>
        <input type="text" />
      </div>
      <div className="employee-name">
        <label htmlFor="">Type of Leave</label>
        <select name="" id="">
          <option value="">EARNED LEAVE</option>
          <option value="">SICK LEAVE</option>
        </select>
      </div>
      <div className="employee-name">
        <label htmlFor="">Reason for Applying</label>
        <textarea rows={4} cols={10}/>
      </div>
      <div className="submit-cancel flex space-bw">
        <button>Apply</button>
        <button>Cancel</button>
      </div>


    </div>
    </div>
  

  </div>
  )
}

export default ApplyLeave
