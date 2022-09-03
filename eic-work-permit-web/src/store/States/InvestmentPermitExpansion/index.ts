import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import {
  FetchInvestmentPermitExpansionBody, FetchInvestmentPermitExpansionBodyTag,
  UpdateStatusInvestmentPermitExpansionBody, UpdateStatusInvestmentPermitExpansionBodyTag,
  CreateInvestmentPermitExpansionBody, CreateInvestmentPermitExpansionBodyTag
} from "./query"
import endPoints from "src/constants/endPoints"
import { IInvestmentPermitExpansionInput } from "src/models/InvestmentModels/investment_permit_expansion"

export const stateName = "investment_permit_expansions"

const initialState = {
  investment_permits: []
}

const constants = {
  "SET_INVESTMENT_PERMIT_EXPANSIONS": "SET_INVESTMENT_PERMIT_EXPANSIONS",
  "UPDATE_INVESTMENT_PERMIT_EXPANSIONS": "UPDATE_INVESTMENT_PERMIT_EXPANSIONS",
  "ADD_INVESTMENT_PERMIT_EXPANSION": "ADD_INVESTMENT_PERMIT_EXPANSION",
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.SET_INVESTMENT_PERMIT_EXPANSIONS: {
      return {
        ...state, investment_permits: action.payload
      }
    }

    case constants.ADD_INVESTMENT_PERMIT_EXPANSION: {
      return {
        ...state, investment_permits: state.investment_permits.concat(action.payload)
      }
    }

    case constants.UPDATE_INVESTMENT_PERMIT_EXPANSIONS: {
      return {
        ...state, investment_permits: state.investment_permits.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setInvestmentPermitExpansions: (payload: any[]) => ({ type: constants.SET_INVESTMENT_PERMIT_EXPANSIONS, payload }),
  UpdateInvestmentPermitExpansions: (payload: any) => ({ type: constants.UPDATE_INVESTMENT_PERMIT_EXPANSIONS, payload }),
  AddInvestmentPermitExpansion: (payload: any) => ({ type: constants.ADD_INVESTMENT_PERMIT_EXPANSION, payload }),
}

export const Selectors = {
  selectInvestmentPermitExpansions: (state: any) => unResolveEntity(state, stateName).investment_permits
}

export const API = {
  FetchInvestmentPermitExpansions: (callback = (err: any, data: any) => null) => {
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
  CreateInvestmentPermitExpansion: (input: IInvestmentPermitExpansionInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateInvestmentPermitExpansionBody(input))
    .then(response => {
      if (response.data.data[CreateInvestmentPermitExpansionBodyTag]) {
        callback(null, response.data.data[CreateInvestmentPermitExpansionBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  RemoveInvestmentPermitExpansion: (_id: string, callback = (err: any, data: any) => null) => {}
}