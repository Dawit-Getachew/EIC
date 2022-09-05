/* eslint-disable */
import InvestmentRoutes from "./Routes/work_permit.routes";

export default {
  PROFILE: {
    __PATH: "user/profile",
    ROUTE: "/user/profile",
  },
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
  WORK_PERMIT: {
    __PATH: "work-permit",
    ROUTE: "/work-permit",
    SERVICES: {
      __PATH: "services",
      ROUTE: "/work-permit/services",
    },
    NEW_WORK_PERMIT: {
      __PATH: "new",
      ROUTE: "/work-permit/new",
    },
    NEW_INVESTMENT_PERMIT_PROPRIETORSHIP: {
      __PATH: "new/sole-proprietorship",
      ROUTE: "/work-permit/new/sole-proprietorship",
    },
    MY_WORK_PERMITS: {
      __PATH: "my",
      ROUTE: "/work-permit/my",
    },
    RENEW_INVESTMENT_PERMIT: {
      __PATH: "renew",
      ROUTE: "/work-permit/renew",
    },
    RENEW_INVESTMENT_PERMIT_FORM: {
      __PATH: "renew/form",
      ROUTE: "/work-permit/renew/form",
    },
    RENEW_INVESTMENT_PERMIT_VIEW: {
      __PATH: "renew/view",
      ROUTE: "/work-permit/renew/view",
    },
    CANCEL_INVESTMENT_PERMIT: {
      __PATH: "cancel",
      ROUTE: "/work-permit/cancel",
    },
    CANCEL_INVESTMENT_PERMIT_FORM: {
      __PATH: "cancel/form",
      ROUTE: "/work-permit/cancel/form",
    },
    CANCEL_INVESTMENT_PERMIT_VIEW: {
      __PATH: "cancel/view",
      ROUTE: "/work-permit/cancel/view",
    },
    EXPANSION_INVESTMENT_PERMIT_LIST: {
      __PATH: "expansion-list",
      ROUTE: "/work-permit/expansion-list",
    },
    EXPAND_MY_INVESTMENT_PERMITS: {
      __PATH: "expand",
      ROUTE: "/work-permit/expand",
    },
    EXPANSION_INVESTMENT_PERMIT_FORM: {
      __PATH: "expansion/form",
      ROUTE: "/work-permit/expansion/form",
    },
    VIEW_EXPANSION_INVESTMENT_PERMIT: {
      __PATH: "expansion/view",
      ROUTE: "/work-permit/expansion/view",
    },
    VIEW_NEW_WORK_PERMIT: {
      __PATH: "new/view",
      ROUTE: "/work-permit/new/view",
    },
    AMEND_INVESTMENT_PERMIT: {
      __PATH: "amend",
      ROUTE: "/work-permit/amend",
    },
    AMEND_INVESTMENT_PERMIT_FORM: {
      __PATH: "amend/form",
      ROUTE: "/work-permit/amend/form",
    },
    AMEND_INVESTMENT_PERMIT_VIEW: {
      __PATH: "amend/view-form",
      ROUTE: "/work-permit/amend/view-form",
    },
    COMPANY_NAME_REGISTRATION: {
      __PATH: "company-name-registration/form",
      ROUTE: "/work-permit/company-name-registration/form",
    },
    COMPANY_NAME_EDIT: {
      __PATH: "company-name-edit/form",
      ROUTE: "/work-permit/company-name-edit/form",
    },
    COMPANY_REGISTRATION_BANK_SLIP: {
      __PATH: "company-registration-bank-slip/form",
      ROUTE: "/work-permit/company-registration-bank-slip/form",
    },
    MEMORANDUM_DOCUMENT_PAGE: {
      __PATH: "invest/document-memorandum-of-associations",
      ROUTE: "/work-permit/invest/document-memorandum-of-associations",
    },
    MEMORANDUM_BANK_SLIP: {
      __PATH: "memorandum-bank-slip/form",
      ROUTE: "/work-permit/memorandum-bank-slip/form",
    },
    CREDIT_ADVICE_BANK_SLIP: {
      __PATH: "credit-advice-bank-slip/form",
      ROUTE: "/work-permit/credit-advice-bank-slip/form",
    },
    SERVICE_FEE_BANK_SLIP: {
      __PATH: "service-fee-bank-slip/form",
      ROUTE: "/work-permit/service-fee-bank-slip/form",
    },
  },
};
