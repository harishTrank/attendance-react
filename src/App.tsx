import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./Screens/Admin/Dashboard";
import EmployeeTab from "./Screens/Admin/EmployeeTab";
import LeavesTab from "./Screens/Admin/LeavesTab";
import EmployeeView from "./Screens/Admin/EmployeeView";
import AttendanceManage from "./Screens/Admin/AttendanceManage";
import Anouncement from "./Screens/Admin/Anouncement";
import RegulariseAdmin from "./Screens/Admin/RegulariseAdmin";
import LoginScreen from "./Screens/Login/Login";
import { useAtom } from "jotai";
import { globalUserType } from "./JotaiStore";

function App() {
  const [globalUserTypeAtom]: any = useAtom(globalUserType);
  const userType: string | null =
    sessionStorage.getItem("userType") || globalUserTypeAtom;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            userType === "Admin" ? (
              <Navigate to="/" replace />
            ) : userType === "User" ? (
              <Navigate to="/employee-dashboard" replace />
            ) : (
              <LoginScreen />
            )
          }
        />

        {userType === "Admin" && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeTab />} />
            <Route path="/leaves" element={<LeavesTab />} />
            <Route path="/view-employee/:id" element={<EmployeeView />} />
            <Route path="/attendancemanage" element={<AttendanceManage />} />
            <Route path="/anouncement" element={<Anouncement />} />
            <Route path="/regulariseadmin" element={<RegulariseAdmin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}

        {userType === "User" && (
          <>
            <Route path="/employee-dashboard" element={<EmployeeView />} />
            <Route
              path="*"
              element={<Navigate to="/employee-dashboard" replace />}
            />
          </>
        )}

        {userType == null && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
