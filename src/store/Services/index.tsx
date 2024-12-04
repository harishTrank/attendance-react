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
