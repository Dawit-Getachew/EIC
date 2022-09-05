/* eslint-disable */
import WorkPermitRoutes from "./Routes/work_permit.routes";

export default {
  AUTH: {
    __PATH: "auth",
    ROUTE: "/auth",
    LOGIN: {
      __PATH: "login",
      ROUTE: "/auth/login",
    },
  },
  WORK_PERMIT: WorkPermitRoutes,
  MESSAGING: {
    __PATH: "messages",
    MY_MESSAGES: {
      __PATH: "my-messages",
      ROUTE: "/messages/my-messages"
    }
  },
  REPORTS: {
    __PATH: "reports",
    SPECIFIC_REPORTS: {
      __PATH: "specific",
      ROUTE: "/reports/specific"
    },
    GENERAL_REPORTS: {
      __PATH: "general",
      ROUTE: "/reports/general"
    },
  },
  DIRECTOR_PAGES: {
    __PATH: "director",
    ASSIGN_WORK_PERMIT: {
      __PATH: "assign-work-permit",
      ROUTE: "/director/assign-work-permit"
    },
  }
};
