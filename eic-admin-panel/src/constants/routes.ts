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
      ROUTE: "/messages/my-messages"
    }
  },
  DIRECTOR_PAGES: {
    __PATH: "director",
    ASSIGN_INVESTMENT_PERMIT: {
      __PATH: "assign-investment-permit",
      ROUTE: "/director/assign-investment-permit"
    },
  },
  REPORTS: {
    __PATH: "reports",
    GENERAL_REPORTS: {
      __PATH: "general-reports",
      ROUTE: "/reports/general-reports"
    },
    SPECIFIC_REPORTS: {
      __PATH: "specific-reports",
      ROUTE: "/reports/specific-reports"
    }
  }
};
