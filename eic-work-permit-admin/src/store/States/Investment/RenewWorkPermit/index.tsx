import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { unResolveEntity } from "src/helpers/resolveEntity"
import { IRenewWorkPermitInput } from "./types"
import {
  CreateRenewWorkPermitBody, CreateRenewWorkPermitBodyTag,
  FetchRenewWorkPermitsBody, FetchRenewWorkPermitsBodyTag,
  UpdateRenewWorkPermitBody, UpdateRenewWorkPermitBodyTag
} from "./query"

export const API = {
  CreateRenewWorkPermit: (input: IRenewWorkPermitInput, callback: Function) => {
    Axios.post(endPoints.baseURL, CreateRenewWorkPermitBody(input))
      .then(res => {
        callback(null, res.data.data[CreateRenewWorkPermitBodyTag])
      })
      .catch(err => callback(err, null))
  },
  UpdateRenewWorkPermit: (input: {
    _id: string; permit_status: string;
  }, callback: Function) => {
    Axios.post(endPoints.baseURL, UpdateRenewWorkPermitBody(input))
      .then(res => {
        callback(null, res.data.data[UpdateRenewWorkPermitBodyTag])
      })
      .catch(err => callback(err, null))
  },
  FetchRenewWorkPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchRenewWorkPermitsBody())
      .then(res => {
        callback(null, res.data.data[FetchRenewWorkPermitsBodyTag])
      })
      .catch(err => callback(err, null))
  }
}

export const stateName = "renew_work_permits"

const initialState = {
  workPermits: []
}

const constants = {
  "SET_RENEW_WORK_PERMITS": "SET_RENEW_WORK_PERMITS",
  "UPDATE_WORK_PERMIT_RENEWALS": "UPDATE_WORK_PERMIT_RENEWALS"
}

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case constants.SET_RENEW_WORK_PERMITS: {
      return {
        ...state, workPermits: action.payload
      }
    }
    case constants.UPDATE_WORK_PERMIT_RENEWALS: {
      return {
        ...state, workPermits: state.workPermits.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setRenewWorkPermits: (payload: any[]) => ({ type: constants.SET_RENEW_WORK_PERMITS, payload }),
  UpdateWorkPermitRenewals: (payload: any) => ({ type: constants.UPDATE_WORK_PERMIT_RENEWALS, payload }),
}

export const Selectors = {
  selectRenewWorkPermits: (state: any) => unResolveEntity(state, stateName).workPermits
}