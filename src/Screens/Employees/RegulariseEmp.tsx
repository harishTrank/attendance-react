import React from 'react'

const RegulariseEmp = () => {
  return (
    <div className="Leave-component">
    <div className="leave-content">
    <h3>Regularize</h3>
  
    <div className="employee-details">
      <div className="employee-name flex alc">
       <p>Employee Name:</p>&nbsp;&nbsp;
        <span>Pranav Kumar</span>
      </div>
      <div className="in-out flex  alc">
    <div className="reg-in">
        <label htmlFor="">InTime</label>
        <input type="time" />
    </div>
    <div className='reg-in'>
        <p>:</p>
    </div>
    
    <div className="reg-in">
        <label htmlFor="">OutTime</label>
        <input type="time" />
    </div>
    <div className='reg-in'>
        <p>:</p>
    </div>
    <div className="reg-in">
        <label htmlFor="">Select Date</label>
        <input type="date" />
    </div>

   </div>
     
      <div className="employee-name">
        <label htmlFor="">Reason</label>
        <textarea rows={4} cols={10}/>
      </div>
      <div className="submit-cancel flex space-bw">
        <button style={{width:"100%"}}>Submit</button>
      
      </div>


    </div>
    </div>
  

  </div>
  )
}

export default RegulariseEmp
