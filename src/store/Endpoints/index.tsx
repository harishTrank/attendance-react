import { defaults } from "../default";

export const apiUrls = {
  userLogin: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "login/",
    },
  },
  userLogout: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "logout/",
    },
  },
  createEmployee: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "create-employee/",
    },
  },
};
