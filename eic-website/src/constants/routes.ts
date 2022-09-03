import InvestmentRoutes from "./Routes/investment.routes";

export default {
  AUTH: {
    __PATH: "auth",
    ROUTE: "/auth",
    LOGIN: {
      __PATH: "login",
      ROUTE: "/auth/login",
    },
  },
  INVESTMENT: InvestmentRoutes,
  MESSAGING: {
    __PATH: "messages",
    MY_MESSAGES: {
      __PATH: "my-messages",
      ROUTE: "/messages/my-messages",
    },
  },
  PROFILE: {
    __PATH: "user/profile",
    ROUTE: "/user/profile",
  },
};
