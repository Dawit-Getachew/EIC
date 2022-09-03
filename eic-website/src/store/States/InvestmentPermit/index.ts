import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import { IInvestmentPermitInput } from "src/models/InvestmentModels/investment_permit"
import {
  AddInvestmentPermitBody, AddInvestmentPermitBodyTag,
  FetchInvestmentPermitsBody, FetchInvestmentPermitsBodyTag,
  UpdateCompanyRegistrationFormBody, UpdateCompanyRegistrationFormBodyTag,
  UpdateNewCompanyNameBody, UpdateNewCompanyNameBodyTag,
  UpdateCompanyRegistrationBankSlipFormBody, UpdateCompanyRegistrationBankSlipFormBodyTag,
  UpdateMemorandumArticleFormBody, UpdateMemorandumArticleFormBodyTag,
  UpdateMemorandumArticleBankSlipBody, UpdateMemorandumArticleBankSlipBodyTag,
  UpdateCreditServiceBankSlipBody, UpdateCreditServiceBankSlipBodyTag,
  UpdateServiceFeeBankSlipBody, UpdateServiceFeeBankSlipBodyTag,
  UpdateSelectedBankBody, UpdateSelectedBankBodyTag,
  IEditBody, UpdateInvestmentPermitBody, UpdateInvestmentPermitBodyTag,
  FetchMyInvestmemitsBody, FetchMyInvestmemitsBodyTag
} from "./query"
import endPoints from "src/constants/endPoints"

export const stateName = "investment_permits"

const initialState = {
  investment_permits: []
}

const constants = {
  "SET_INVESTMENT_PERMITS": "SET_INVESTMENT_PERMITS",
  "UPDATE_INVESTMENT_PERMIT": "UPDATE_INVESTMENT_PERMIT"
}

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case constants.SET_INVESTMENT_PERMITS: {
      return {
        ...state, investment_permits: action.payload
      }
    }

    case constants.UPDATE_INVESTMENT_PERMIT: {
      return {
        ...state, investment_permits: state.investment_permits.map((item: any) =>
          String(item._id) === String(action.payload._id)? { ...item, ...action.payload } : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setInvestmentPermits: (payload: any[]) => ({ type: constants.SET_INVESTMENT_PERMITS, payload }),
  updateInvestmentPermits: (payload: any) => ({ type: constants.UPDATE_INVESTMENT_PERMIT, payload }),
}

export const Selectors = {
  selectInvestmentPermits: (state: any) => unResolveEntity(state, stateName).investment_permits
}

export const API = {
  addInvestmentPermit: (input: IInvestmentPermitInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, AddInvestmentPermitBody(input))
      .then(response => {
        if (response.data.data[AddInvestmentPermitBodyTag]) {
          callback(null, response.data.data[AddInvestmentPermitBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  FetchInvestmentPermits: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchInvestmentPermitsBody())
      .then(response => {
        if (response.data.data[FetchInvestmentPermitsBodyTag]) {
          callback(null, response.data.data[FetchInvestmentPermitsBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  FetchMyInvestmentPermits: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchMyInvestmemitsBody(_id))
      .then(response => {
        if (response.data.data[FetchMyInvestmemitsBodyTag]) {
          callback(null, response.data.data[FetchMyInvestmemitsBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateCompanyRegistrationForm: (input: { _id: string, company_registration_form: string }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateCompanyRegistrationFormBody(input))
      .then(response => {
        if (response.data.data[UpdateCompanyRegistrationFormBodyTag]) {
          callback(null, response.data.data[UpdateCompanyRegistrationFormBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateNewCompanyName: (input: {
    _id: string, memorandum_of_association: string,
    edited_name: string, edited_name_amharic: string,
    edited_trade_name: string, edited_trade_name_amharic: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateNewCompanyNameBody(input))
      .then(response => {
        if (response.data.data[UpdateNewCompanyNameBodyTag]) {
          callback(null, response.data.data[UpdateNewCompanyNameBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateMemorandumArticleForm: (input: {
    _id: string, memorandum_of_association: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateMemorandumArticleFormBody(input))
      .then(response => {
        if (response.data.data[UpdateMemorandumArticleFormBodyTag]) {
          callback(null, response.data.data[UpdateMemorandumArticleFormBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateCompanyRegistrationBankSlipForm: (input: {
    _id: string, company_registration_bank_slip_form: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateCompanyRegistrationBankSlipFormBody(input))
      .then(response => {
        if (response.data.data[UpdateCompanyRegistrationBankSlipFormBodyTag]) {
          callback(null, response.data.data[UpdateCompanyRegistrationBankSlipFormBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateMemorandumArticleBankSlip: (input: {
    _id: string, memorandum_bank_slip_form: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateMemorandumArticleBankSlipBody(input))
      .then(response => {
        if (response.data.data[UpdateMemorandumArticleBankSlipBodyTag]) {
          callback(null, response.data.data[UpdateMemorandumArticleBankSlipBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateCreditServiceBankSlip: (input: {
    _id: string, credit_service_bank_slip_form: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateCreditServiceBankSlipBody(input))
      .then(response => {
        if (response.data.data[UpdateCreditServiceBankSlipBodyTag]) {
          callback(null, response.data.data[UpdateCreditServiceBankSlipBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateServiceFeeBankSlip: (input: {
    _id: string, service_fee_bank_slip_form: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateServiceFeeBankSlipBody(input))
      .then(response => {
        if (response.data.data[UpdateServiceFeeBankSlipBodyTag]) {
          callback(null, response.data.data[UpdateServiceFeeBankSlipBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateSelectedBank: (input: {
    _id: string, selected_bank: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateSelectedBankBody(input))
      .then(response => {
        if (response.data.data[UpdateSelectedBankBodyTag]) {
          callback(null, response.data.data[UpdateSelectedBankBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateInvestmentPermit: (input: IEditBody, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateInvestmentPermitBody(input))
      .then(response => {
        if (response.data.data[UpdateInvestmentPermitBodyTag]) {
          callback(null, response.data.data[UpdateInvestmentPermitBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
}