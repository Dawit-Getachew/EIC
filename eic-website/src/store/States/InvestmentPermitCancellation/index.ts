import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import {
  FetchInvestmentPermitCancellationBody, FetchInvestmentPermitCancellationBodyTag,
  UpdateStatusInvestmentPermitCancellationBody, UpdateStatusInvestmentPermitCancellationBodyTag,
  CreateInvestmentPermitCancellationBody, CreateInvestmentPermitCancellationBodyTag
} from "./query"
import endPoints from "src/constants/endPoints"

export const stateName = "investment_permit_cancellations"

const initialState = {
  investment_permits: []
}

const constants = {
  "SET_INVESTMENT_PERMIT_CANCELLATIONS": "SET_INVESTMENT_PERMIT_CANCELLATIONS",
  "UPDATE_INVESTMENT_PERMIT_CANCELLATIONS": "UPDATE_INVESTMENT_PERMIT_CANCELLATIONS",
  "ADD_INVESTMENT_PERMIT_CANCELLATION": "ADD_INVESTMENT_PERMIT_CANCELLATION",
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.SET_INVESTMENT_PERMIT_CANCELLATIONS: {
      return {
        ...state, investment_permits: action.payload
      }
    }

    case constants.ADD_INVESTMENT_PERMIT_CANCELLATION: {
      return {
        ...state, investment_permits: state.investment_permits.concat(action.payload)
      }
    }

    case constants.UPDATE_INVESTMENT_PERMIT_CANCELLATIONS: {
      return {
        ...state, investment_permits: state.investment_permits.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setInvestmentPermitCancellations: (payload: any[]) => ({ type: constants.SET_INVESTMENT_PERMIT_CANCELLATIONS, payload }),
  UpdateInvestmentPermitCancellations: (payload: any) => ({ type: constants.UPDATE_INVESTMENT_PERMIT_CANCELLATIONS, payload }),
  AddInvestmentPermitCancellation: (payload: any) => ({ type: constants.ADD_INVESTMENT_PERMIT_CANCELLATION, payload }),
}

export const Selectors = {
  selectInvestmentPermitCancellations: (state: any) => unResolveEntity(state, stateName).investment_permits
}

export const API = {
  FetchInvestmentPermitCancellations: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchInvestmentPermitCancellationBody())
      .then(response => {
        if (response.data.data[FetchInvestmentPermitCancellationBodyTag]) {
          callback(null, response.data.data[FetchInvestmentPermitCancellationBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateStatusInvestmentPermitCancellation: (_id: string, permit_status: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateStatusInvestmentPermitCancellationBody({ _id, permit_status }))
    .then(response => {
      if (response.data.data[UpdateStatusInvestmentPermitCancellationBodyTag]) {
        callback(null, response.data.data[UpdateStatusInvestmentPermitCancellationBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  CreateInvestmentPermitCancellation: (input: {
    investment_id: string, service_id: string, project_status: string[],
    problems_encountered: string, cancellation_document: string,
    has_duty_free: boolean, duty_free_content: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateInvestmentPermitCancellationBody(input))
    .then(response => {
      if (response.data.data[CreateInvestmentPermitCancellationBodyTag]) {
        callback(null, response.data.data[CreateInvestmentPermitCancellationBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  RemoveInvestmentPermitCancellation: (_id: string, callback = (err: any, data: any) => null) => {}
}