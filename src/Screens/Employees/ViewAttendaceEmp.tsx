import React from 'react'

const ViewAttendaceEmp = () => {
  return (
    <div>
    <div className="all-employees">
 <div className="search-section flex alc space-bw">
     <div className='flex alc'>
   <div className="from">
  
             <label htmlFor="">From</label>
             <input type="date" />
         </div>
         <div className="to">
             <label htmlFor="">To</label>
             <input type="date" />
         </div>
         </div>
         <div className="csvdownload-btn">
             <button><i className="fa-solid fa-envelope-open-text"/>&nbsp;Download csv</button>
         </div>
  
   </div>
 </div>
 <div className="all-employees employees-detail">
 <div className="flex space-bw alc top-h">
       <h3>Employee Attendance</h3>
       <div className="pos-relate">
         <input
           type="text"
           name=""
           id=""
           placeholder="Enter Employee Name"
         />
         <i className="fa-solid fa-magnifying-glass"></i>
       </div>
     </div>
 
   
     <table>
         <tr>
             <th>Employee Code</th>
             <th>Employee Name</th>
             <th>Designation</th>
             <th>Days worked</th>
             <th>LOP</th>
             <th>Week Off</th>
             <th>Paid Days</th>
             <th>Extra work days</th>
             <th>EL Applied</th>
             <th>SL Applied</th>
             <th>Night Bonus</th>
             <th>Refferal</th>
             <th>EL/SL Avl.</th>
            
         </tr>
         <tr>
             <td>Harsh</td>
             <td>Front end developer</td>
             <td>IT</td>
             <td>5</td>
             <td>2.5</td>
             <td>28/11/2024</td>
             <td>Cousin Marriage</td>
            
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
  )
}

export default ViewAttendaceEmp
