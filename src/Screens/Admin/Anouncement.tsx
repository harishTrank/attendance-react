import React from 'react'
import Sidebar from '../../ReuseableComponent/Sidebar'

const Anouncement = () => {
  return (
    <div className='flex'>
         <Sidebar current={"Anouncement"} />
         <div className="main-area">
            <div className="all-employees">
                <h3>Create Anouncement</h3>
                <div className="anouncement-form">
                    <div className="title">
                    <label htmlFor="">Title</label>
                    <input type="text" />
                    </div>
                    <div className="description">
                        <label htmlFor="">Description</label>
                        <textarea name="" id="" rows={4} cols={10}></textarea>
                    </div>
                    <div className="submit-btn">
                        <button>Submit</button>
                    </div>
                   
                </div>
            </div>
            <div className="all-employees anouncement-table">
                <h3>List of Anouncements:</h3>
                <table>
                    <tr>
                        <th style={{borderRight:"1px solid #fff"}} >Created At</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>Aug. 5, 2024, 7 p.m.</td>
                        <td>Hello wassup</td>
                    </tr>
                    <tr>
                        <td>Aug. 5, 2024, 7 p.m.</td>
                        <td>Hello wassup</td>
                    </tr>
                </table>
            </div>
         </div>
      
    </div>
  )
}

export default Anouncement
