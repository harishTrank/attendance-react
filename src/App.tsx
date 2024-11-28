import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Screens/Admin/Dashboard";
import EmployeeTab from "./Screens/Admin/EmployeeTab";
import LeavesTab from "./Screens/Admin/LeavesTab";
import DashboardEmp from "./Screens/Employees/DashboardEmp";
import EmployeeView from "./Screens/Admin/EmployeeView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeTab />} />
        <Route path="/leaves" element={<LeavesTab />} />
        <Route path="/view-employee/:id" element={<EmployeeView />} />

        {/* employee routes */}
        <Route path="/employee-dashboard" element={<DashboardEmp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
