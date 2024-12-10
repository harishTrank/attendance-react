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
  getParticularEmployee: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "employee-details/",
    },
  },
  listEmployees: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "employee-list/",
    },
  },
  deleteEmployee: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "delete-employee/",
    },
  },
  editEmployee: {
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: "edit-employee/",
    },
  },
  createAnouncements: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "anouncement/",
    },
  },
  listAnouncements: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "all-anouncement/",
    },
  },
  clockIn: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "in-out-time/",
    },
  },
  getCurrentInTime: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "in-time/",
    },
  },
  getAllAttendance: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "get-all-attendance/",
    },
  },
  applyRegularization: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "apply-regularization/",
    },
  },
  listRegularization: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "apply-regularization/",
    },
  },
  approvalRegularization: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "approve-regularization/",
    },
  },
};
