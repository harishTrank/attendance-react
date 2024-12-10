import { callApi } from "../../Utils/api/apiUtils";
import { apiUrls } from "../Endpoints";

export const userLoginApi = ({ body }: any) =>
  callApi({
    uriEndPoint: apiUrls.userLogin.v1,
    body,
  });

export const userLogoutApi = () =>
  callApi({
    uriEndPoint: apiUrls.userLogout.v1,
  });

export const createEmployeeApi = ({ body }: any) =>
  callApi({
    uriEndPoint: apiUrls.createEmployee.v1,
    body,
  });

export const getParticularEmployee = ({ query }: any) =>
  callApi({
    uriEndPoint: apiUrls.getParticularEmployee.v1,
    query,
  });

export const listEmployeesApi = ({ query }: any) =>
  callApi({
    uriEndPoint: apiUrls.listEmployees.v1,
    query,
  });

export const createAnouncementsApi = ({ body }: any) =>
  callApi({
    uriEndPoint: apiUrls.createAnouncements.v1,
    body,
  });

export const deleteEmployeeApi = ({ query }: any) =>
  callApi({
    uriEndPoint: apiUrls.deleteEmployee.v1,
    query,
  });

export const listAnouncementsApi = ({ query }: any) =>
  callApi({
    uriEndPoint: apiUrls.listAnouncements.v1,
    query,
  });

export const editEmployeeApi = ({ query, body }: any) =>
  callApi({
    uriEndPoint: apiUrls.editEmployee.v1,
    query,
    body,
  });

export const clockInApi = ({ body }: any) =>
  callApi({
    uriEndPoint: apiUrls.clockIn.v1,
    body,
  });

export const getCurrentInTimeApi = ({ query }: any) =>
  callApi({
    uriEndPoint: apiUrls.getCurrentInTime.v1,
    query,
  });

export const getAllAttendanceApi = ({ query }: any) =>
  callApi({
    uriEndPoint: apiUrls.getAllAttendance.v1,
    query,
  });

export const applyRegularizationApi = ({ query, body }: any) =>
  callApi({
    uriEndPoint: apiUrls.applyRegularization.v1,
    body,
    query,
  });

export const listRegularizationApi = ({ query }: any) =>
  callApi({
    uriEndPoint: apiUrls.listRegularization.v1,
    query,
  });

export const approvalRegularizationApi = ({ body }: any) =>
  callApi({
    uriEndPoint: apiUrls.approvalRegularization.v1,
    body,
  });

export const adminDashboardAttendanceApi = () =>
  callApi({
    uriEndPoint: apiUrls.adminDashboardAttendance.v1,
  });
