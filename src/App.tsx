import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./Screens/Admin/Dashboard";
import EmployeeTab from "./Screens/Admin/EmployeeTab";
import LeavesTab from "./Screens/Admin/LeavesTab";
import AttendanceManage from "./Screens/Admin/AttendanceManage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeTab />} />
        <Route path="/leaves" element={<LeavesTab />} />
        <Route path="/attendance" element={<AttendanceManage/>}/>
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
