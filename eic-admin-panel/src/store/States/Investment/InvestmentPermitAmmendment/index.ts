import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import {
  FetchInvestmentPermitAmmendmentBody, FetchInvestmentPermitAmmendmentBodyTag,
  UpdateStatusInvestmentPermitAmmendmentBody, UpdateStatusInvestmentPermitAmmendmentBodyTag
} from "./query"
import endPoints from "src/constants/endPoints"

export const stateName = "investment_permit_ammendment"

const initialState = {
  investment_permits: []
}

const constants = {
  "SET_INVESTMENT_PERMIT_AMMENDMENTS": "SET_INVESTMENT_PERMIT_AMMENDMENTS",
  "UPDATE_INVESTMENT_PERMIT_AMMENDMENTS": "UPDATE_INVESTMENT_PERMIT_AMMENDMENTS",
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.SET_INVESTMENT_PERMIT_AMMENDMENTS: {
      return {
        ...state, investment_permits: action.payload
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
}

export const Selectors = {
  selectInvestmentPermitAmmendments: (state: any) => unResolveEntity(state, stateName).investment_permits
}

export const API = {
  FetchInvestmentPermitAmmendments: (_: any, callback = (err: any, data: any) => null) => {
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
  RemoveInvestmentPermitAmmendment: (_id: string, callback = (err: any, data: any) => null) => {}
}