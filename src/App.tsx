import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Screens/Admin/Dashboard";
import EmployeeTab from "./Screens/Admin/EmployeeTab";
import LeavesTab from "./Screens/Admin/LeavesTab";
import EmployeeView from "./Screens/Admin/EmployeeView";
import AttendanceManage from "./Screens/Admin/AttendanceManage";
import Anouncement from "./Screens/Admin/Anouncement";
import RegulariseAdmin from "./Screens/Admin/RegulariseAdmin";
import LoginScreen from "./Screens/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeTab />} />
        <Route path="/leaves" element={<LeavesTab />} />
        <Route path="/view-employee/:id" element={<EmployeeView />} />
        <Route path="/attendancemanage" element={<AttendanceManage />} />
        <Route path="/anouncement" element={<Anouncement />} />
        <Route path="/regulariseadmin" element={<RegulariseAdmin/>}/>

        <Route path="/employee-dashboard" element={<EmployeeView />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
