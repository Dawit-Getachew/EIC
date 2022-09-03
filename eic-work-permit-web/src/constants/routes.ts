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
  }
};
