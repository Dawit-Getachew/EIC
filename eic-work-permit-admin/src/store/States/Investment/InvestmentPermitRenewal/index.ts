import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import {
  FetchInvestmentPermitRenewalBody, FetchInvestmentPermitRenewalBodyTag,
  UpdateStatusInvestmentPermitRenewalBody, UpdateStatusInvestmentPermitRenewalBodyTag
} from "./query"
import endPoints from "src/constants/endPoints"

export const stateName = "investment_permit_renewals"

const initialState = {
  investment_permits_renewals: []
}

const constants = {
  "SET_INVESTMENT_PERMIT_RENEWALS": "SET_INVESTMENT_PERMIT_RENEWALS",
  "UPDATE_INVESTMENT_PERMIT_RENEWALS": "UPDATE_INVESTMENT_PERMIT_RENEWALS",
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.SET_INVESTMENT_PERMIT_RENEWALS: {
      return {
        ...state, investment_permits_renewals: action.payload
      }
    }

    case constants.UPDATE_INVESTMENT_PERMIT_RENEWALS: {
      return {
        ...state, investment_permits_renewals: state.investment_permits_renewals.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setInvestmentPermitRenewals: (payload: any[]) => ({ type: constants.SET_INVESTMENT_PERMIT_RENEWALS, payload }),
  UpdateInvestmentPermitRenewals: (payload: any) => ({ type: constants.UPDATE_INVESTMENT_PERMIT_RENEWALS, payload }),
}

export const Selectors = {
  selectInvestmentPermitRenewals: (state: any) => unResolveEntity(state, stateName).investment_permits_renewals
}

export const API = {
  FetchInvestmentPermitRenewals: (_: any, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchInvestmentPermitRenewalBody())
      .then(response => {
        if (response.data.data[FetchInvestmentPermitRenewalBodyTag]) {
          callback(null, response.data.data[FetchInvestmentPermitRenewalBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateStatusInvestmentPermitRenewal: (_id: string, permit_status: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateStatusInvestmentPermitRenewalBody({ _id, permit_status }))
    .then(response => {
      if (response.data.data[UpdateStatusInvestmentPermitRenewalBodyTag]) {
        callback(null, response.data.data[UpdateStatusInvestmentPermitRenewalBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  RemoveInvestmentPermitRenewal: (_id: string, callback = (err: any, data: any) => null) => {}
}