import React from 'react'
import { Calendar } from 'antd'

const EmployeeCalander = () => {
  const onPanelChange = (value:any, mode:any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
 
  return (
    <div>
      <Calendar onPanelChange={onPanelChange}  style={{ height: '380px', overflow: 'auto' }}  className="custom-calendar"  
    />;
    </div>
  )
}

export default EmployeeCalander
