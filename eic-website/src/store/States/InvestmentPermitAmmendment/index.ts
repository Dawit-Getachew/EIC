import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import {
  FetchInvestmentPermitAmmendmentBody, FetchInvestmentPermitAmmendmentBodyTag,
  UpdateStatusInvestmentPermitAmmendmentBody, UpdateStatusInvestmentPermitAmmendmentBodyTag,
  CreateInvestmentPermitAmmendmentBody, CreateInvestmentPermitAmmendmentBodyTag
} from "./query"
import endPoints from "src/constants/endPoints"

export const stateName = "investment_permit_ammendments"

const initialState = {
  investment_permits: []
}

const constants = {
  "SET_INVESTMENT_PERMIT_AMMENDMENTS": "SET_INVESTMENT_PERMIT_AMMENDMENTS",
  "UPDATE_INVESTMENT_PERMIT_AMMENDMENTS": "UPDATE_INVESTMENT_PERMIT_AMMENDMENTS",
  "ADD_INVESTMENT_PERMIT_CANCELLATION": "ADD_INVESTMENT_PERMIT_CANCELLATION",
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.SET_INVESTMENT_PERMIT_AMMENDMENTS: {
      return {
        ...state, investment_permits: action.payload
      }
    }

    case constants.ADD_INVESTMENT_PERMIT_CANCELLATION: {
      return {
        ...state, investment_permits: state.investment_permits.concat(action.payload)
      }
    }

    case constants.UPDATE_INVESTMENT_PERMIT_AMMENDMENTS: {
      return {
        ...state, investment_permits: state.investment_permits.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setInvestmentPermitAmmendments: (payload: any[]) => ({ type: constants.SET_INVESTMENT_PERMIT_AMMENDMENTS, payload }),
  UpdateInvestmentPermitAmmendments: (payload: any) => ({ type: constants.UPDATE_INVESTMENT_PERMIT_AMMENDMENTS, payload }),
  AddInvestmentPermitAmmendment: (payload: any) => ({ type: constants.ADD_INVESTMENT_PERMIT_CANCELLATION, payload }),
}

export const Selectors = {
  selectInvestmentPermitAmmendments: (state: any) => unResolveEntity(state, stateName).investment_permits
}

export const API = {
  FetchInvestmentPermitAmmendments: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchInvestmentPermitAmmendmentBody())
      .then(response => {
        if (response.data.data[FetchInvestmentPermitAmmendmentBodyTag]) {
          callback(null, response.data.data[FetchInvestmentPermitAmmendmentBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateStatusInvestmentPermitAmmendment: (_id: string, permit_status: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateStatusInvestmentPermitAmmendmentBody({ _id, permit_status }))
    .then(response => {
      if (response.data.data[UpdateStatusInvestmentPermitAmmendmentBodyTag]) {
        callback(null, response.data.data[UpdateStatusInvestmentPermitAmmendmentBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  CreateInvestmentPermitAmmendment: (input: {
    investment_id: string, service_id: string, company_name: string,
  company_name_amharic: string, trade_name: string, trade_name_amharic: string,
  investor_nationality: string, type_of_business: string, type_of_ownership: string,
  shareholders: [{ name: string, nationality: string, country_of_incorporation: string, address: string }],
  manager_full_name: string, manager_full_name_amharic: string, investment_capital_usd: number, investment_capital_birr: number
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateInvestmentPermitAmmendmentBody(input))
    .then(response => {
      if (response.data.data[CreateInvestmentPermitAmmendmentBodyTag]) {
        callback(null, response.data.data[CreateInvestmentPermitAmmendmentBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  RemoveInvestmentPermitAmmendment: (_id: string, callback = (err: any, data: any) => null) => {}
}