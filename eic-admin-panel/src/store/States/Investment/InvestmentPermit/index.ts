import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import { IInvestmentPermitInput } from "src/models/InvestmentModels/investment_permit"
import {
  FetchInvestmentPemitBody, FetchInvestmentPemitBodyTag,
  UpdateStatusInvestmentPermitBody, UpdateStatusInvestmentPermitBodyTag,
  UpdateInvestmentPermitBody, UpdateInvestmentPermitBodyTag,
  UpdateCompanyNameInvestmentPermitBody, UpdateCompanyNameInvestmentPermitBodyTag,
  UpdateTinRegNumberBody, UpdateTinRegNumberBodyTag,
  FetchUnAssignedInvestmentPermitsBody, FetchUnAssignedInvestmentPermitsBodyTag,
  FetchAssignedInvestmentPermitsBody, FetchAssignedInvestmentPermitsBodyTag,
  AssignEmployeeToInvestmentPermitBody, AssignEmployeeToInvestmentPermitBodyTag, InputAssignEmployeeToInvestmentPermitBody,
  FetchAdminInvestmentPermitsBody, FetchAdminInvestmentPermitsBodyTag, InputFetchAdminInvestmentPermitsBody
} from "./query"
import endPoints from "src/constants/endPoints"

export const stateName = "investment_permits"

const initialState = {
  investment_permits: []
}

const constants = {
  "SET_INVESTMENT_PERMITS": "SET_INVESTMENT_PERMITS",
  "UPDATE_INVESTMENT_PERMITS": "UPDATE_INVESTMENT_PERMITS",
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.SET_INVESTMENT_PERMITS: {
      return {
        ...state, investment_permits: action.payload
      }
    }

    case constants.UPDATE_INVESTMENT_PERMITS: {
      return {
        ...state, investment_permits: state.investment_permits.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setInvestmentPermits: (payload: any[]) => ({ type: constants.SET_INVESTMENT_PERMITS, payload }),
  UpdateInvestmentPermits: (payload: any) => ({ type: constants.UPDATE_INVESTMENT_PERMITS, payload }),
}

export const Selectors = {
  selectInvestmentPermits: (state: any) => unResolveEntity(state, stateName).investment_permits
}

export const API = {
  FetchInvestmentPermits: (_: any, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchInvestmentPemitBody())
      .then(response => {
        if (response.data.data[FetchInvestmentPemitBodyTag]) {
          callback(null, response.data.data[FetchInvestmentPemitBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateStatusInvestmentPermit: (_id: string, permit_status: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateStatusInvestmentPermitBody({ _id, permit_status }))
    .then(response => {
      if (response.data.data[UpdateStatusInvestmentPermitBodyTag]) {
        callback(null, response.data.data[UpdateStatusInvestmentPermitBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  UpdateInvestmentPermit: (input: any, callback = (err: any, data: any) => null) => {
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
  UpdateTinRegNumber: (input: {
    _id: string, registration_number: string, tin_number: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateTinRegNumberBody(input))
    .then(response => {
      if (response.data.data[UpdateTinRegNumberBodyTag]) {
        callback(null, response.data.data[UpdateTinRegNumberBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  UpdateCompanyNameInvestmentPermitBody: (input: {
    _id: string, permit_status: string,
    edited_name: string, edited_name_amharic: string,
    edited_trade_name: string, edited_trade_name_amharic: string
  }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateCompanyNameInvestmentPermitBody(input))
    .then(response => {
      if (response.data.data[UpdateCompanyNameInvestmentPermitBodyTag]) {
        callback(null, response.data.data[UpdateCompanyNameInvestmentPermitBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  RemoveInvestmentPermit: (_id: string, callback = (err: any, data: any) => null) => {},
  FetchUnAssignedInvestmentPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchUnAssignedInvestmentPermitsBody())
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchUnAssignedInvestmentPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  FetchAssignedInvestmentPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchAssignedInvestmentPermitsBody())
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchAssignedInvestmentPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  AssignEmployeeToInvestmentPermitBody: (input: InputAssignEmployeeToInvestmentPermitBody, callback: Function) => {
    Axios.post(endPoints.baseURL, AssignEmployeeToInvestmentPermitBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[AssignEmployeeToInvestmentPermitBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  FetchAdminInvestmentPermitsBody: (input: InputFetchAdminInvestmentPermitsBody, callback: Function) => {
    Axios.post(endPoints.baseURL, FetchAdminInvestmentPermitsBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchAdminInvestmentPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
}