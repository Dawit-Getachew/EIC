import InvestmentRoutes from "./Routes/investment.routes";

export default {
  AUTH: {
    __PATH: "auth",
    ROUTE: "/auth",
    LOGIN: {
      __PATH: "login",
      ROUTE: "/auth/login",
    },
    SIGNUP: {
      __PATH: "sign-up",
      ROUTE: "/auth/sign-up",
    },
  },
  PROFILE: {
    __PATH: "user/profile",
    ROUTE: "/user/profile",
  },
  INVESTMENT: {
    __PATH: "invest",
    ROUTE: "/invest",
    SERVICES: {
      __PATH: "services",
      ROUTE: "/invest/services",
    },
    CAPITAL_REGISTRATION: {
      __PATH: "services/capital-registration",
      ROUTE: "/invest/services/capital-registration",
    },
    CAPITAL_REGISTRATION_FORM: {
      __PATH: "services/capital-registration-form",
      ROUTE: "/invest/services/capital-registration-form",
    },
    NOTORIZED_MINUTES: {
      __PATH: "services/notorized-minutes",
      ROUTE: "/invest/services/notorized-minutes",
    },
    NOTORIZED_MINUTES_FORM: {
      __PATH: "services/notorized-minutes-form",
      ROUTE: "/invest/services/notorized-minutes-form",
    },
    REQUEST_RESIDENCE_PERMIT: {
      __PATH: "services/request-residence-permit",
      ROUTE: "/invest/services/request-residence-permit",
    },
    NEW_INVESTMENT_PERMIT: {
      __PATH: "new",
      ROUTE: "/invest/new",
    },
    NEW_INVESTMENT_PERMIT_PROPRIETORSHIP: {
      __PATH: "new/sole-proprietorship",
      ROUTE: "/invest/new/sole-proprietorship",
    },
    MY_INVESTMENT_PERMITS: {
      __PATH: "my",
      ROUTE: "/invest/my",
    },
    RENEW_INVESTMENT_PERMIT: {
      __PATH: "renew",
      ROUTE: "/invest/renew",
    },
    RENEW_INVESTMENT_PERMIT_FORM: {
      __PATH: "renew/form",
      ROUTE: "/invest/renew/form",
    },
    RENEW_INVESTMENT_PERMIT_VIEW: {
      __PATH: "renew/view",
      ROUTE: "/invest/renew/view",
    },
    CANCEL_INVESTMENT_PERMIT: {
      __PATH: "cancel",
      ROUTE: "/invest/cancel",
    },
    CANCEL_INVESTMENT_PERMIT_FORM: {
      __PATH: "cancel/form",
      ROUTE: "/invest/cancel/form",
    },
    CANCEL_INVESTMENT_PERMIT_VIEW: {
      __PATH: "cancel/view",
      ROUTE: "/invest/cancel/view",
    },
    EXPANSION_INVESTMENT_PERMIT_LIST: {
      __PATH: "expansion-list",
      ROUTE: "/invest/expansion-list",
    },
    EXPAND_MY_INVESTMENT_PERMITS: {
      __PATH: "expand",
      ROUTE: "/invest/expand",
    },
    EXPANSION_INVESTMENT_PERMIT_FORM: {
      __PATH: "expansion/form",
      ROUTE: "/invest/expansion/form",
    },
    VIEW_EXPANSION_INVESTMENT_PERMIT: {
      __PATH: "expansion/view",
      ROUTE: "/invest/expansion/view",
    },
    VIEW_NEW_INVESTMENT_PERMIT: {
      __PATH: "new/view",
      ROUTE: "/invest/new/view",
    },
    EDIT_NEW_INVESTMENT_PERMIT: {
      __PATH: "new/edit",
      ROUTE: "/invest/new/edit",
    },
    AMEND_INVESTMENT_PERMIT: {
      __PATH: "amend",
      ROUTE: "/invest/amend",
    },
    AMEND_INVESTMENT_PERMIT_FORM: {
      __PATH: "amend/form",
      ROUTE: "/invest/amend/form",
    },
    AMEND_INVESTMENT_PERMIT_VIEW: {
      __PATH: "amend/view-form",
      ROUTE: "/invest/amend/view-form",
    },
    COMPANY_NAME_REGISTRATION: {
      __PATH: "company-name-registration/form",
      ROUTE: "/invest/company-name-registration/form",
    },
    COMPANY_NAME_EDIT: {
      __PATH: "company-name-edit/form",
      ROUTE: "/invest/company-name-edit/form",
    },
    COMPANY_REGISTRATION_BANK_SLIP: {
      __PATH: "company-registration-bank-slip/form",
      ROUTE: "/invest/company-registration-bank-slip/form",
    },
    MEMORANDUM_DOCUMENT_PAGE: {
      __PATH: "invest/document-memorandum-of-associations",
      ROUTE: "/invest/invest/document-memorandum-of-associations",
    },
    MEMORANDUM_BANK_SLIP: {
      __PATH: "memorandum-bank-slip/form",
      ROUTE: "/invest/memorandum-bank-slip/form",
    },
    CREDIT_ADVICE_BANK_SLIP: {
      __PATH: "credit-advice-bank-slip/form",
      ROUTE: "/invest/credit-advice-bank-slip/form",
    },
    SERVICE_FEE_BANK_SLIP: {
      __PATH: "service-fee-bank-slip/form",
      ROUTE: "/invest/service-fee-bank-slip/form",
    },
  }
};
