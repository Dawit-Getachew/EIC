import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import {
  FetchInvestmentPermitExpansionBody, FetchInvestmentPermitExpansionBodyTag,
  UpdateStatusInvestmentPermitExpansionBody, UpdateStatusInvestmentPermitExpansionBodyTag
} from "./query"
import endPoints from "src/constants/endPoints"

export const stateName = "investment_permit_expansions"

const initialState = {
  investment_permit_expansions: []
}

const constants = {
  "SET_INVESTMENT_PERMIT_EXPANSIONS": "SET_INVESTMENT_PERMIT_EXPANSIONS",
  "UPDATE_INVESTMENT_PERMIT_EXPANSIONS": "UPDATE_INVESTMENT_PERMIT_EXPANSIONS",
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.SET_INVESTMENT_PERMIT_EXPANSIONS: {
      return {
        ...state, investment_permit_expansions: action.payload
      }
    }

    case constants.UPDATE_INVESTMENT_PERMIT_EXPANSIONS: {
      return {
        ...state, investment_permit_expansions: state.investment_permit_expansions.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setInvestmentPermitExpansions: (payload: any[]) => ({ type: constants.SET_INVESTMENT_PERMIT_EXPANSIONS, payload }),
  UpdateInvestmentPermitExpansions: (payload: any) => ({ type: constants.UPDATE_INVESTMENT_PERMIT_EXPANSIONS, payload }),
}

export const Selectors = {
  selectInvestmentPermitExpansions: (state: any) => unResolveEntity(state, stateName).investment_permit_expansions
}

export const API = {
  FetchInvestmentPermitExpansions: (_: any, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchInvestmentPermitExpansionBody())
      .then(response => {
        if (response.data.data[FetchInvestmentPermitExpansionBodyTag]) {
          callback(null, response.data.data[FetchInvestmentPermitExpansionBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateStatusInvestmentPermitExpansion: (_id: string, permit_status: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateStatusInvestmentPermitExpansionBody({ _id, permit_status }))
    .then(response => {
      if (response.data.data[UpdateStatusInvestmentPermitExpansionBodyTag]) {
        callback(null, response.data.data[UpdateStatusInvestmentPermitExpansionBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  RemoveInvestmentPermitExpansion: (_id: string, callback = (err: any, data: any) => null) => {}
}