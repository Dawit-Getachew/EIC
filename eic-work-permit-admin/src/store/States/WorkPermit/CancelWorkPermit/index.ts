import Axios from "axios"
import { unResolveEntity } from "src/helpers/resolveEntity"
import endPoints from "src/constants/endPoints"
import {
  FetchCancelWorkPermitsBody, FetchCancelWorkPermitsBodyTag,
  IUpdatePermitStatus, UpdateCancelWorkPermitStatusBody, UpdateCancelWorkPermitStatusBodyTag
} from './query'

export const API = {
  FetchCancelWorkPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchCancelWorkPermitsBody())
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchCancelWorkPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  UpdateCancelWorkPermitStatus: (input: IUpdatePermitStatus, callback: Function) => {
    Axios.post(endPoints.baseURL, UpdateCancelWorkPermitStatusBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[UpdateCancelWorkPermitStatusBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
}

export const stateName = "cancel_work_permits"

const initialState = {
  cancel_work_permits: []
}

const constants = {
  "SET_CANCEL_WORK_PERMITS": "SET_CANCEL_WORK_PERMITS",
  "UPDATE_CANCEL_WORK_PERMITS": "UPDATE_CANCEL_WORK_PERMITS",
}

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case constants.SET_CANCEL_WORK_PERMITS: {
      return {
        ...state, cancel_work_permits: action.payload
      }
    }

    case constants.UPDATE_CANCEL_WORK_PERMITS: {
      return {
        ...state, cancel_work_permits: state.cancel_work_permits.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setCancelWorkPermits: (payload: any[]) => ({ type: constants.SET_CANCEL_WORK_PERMITS, payload }),
  UpdateCancelWorkPermits: (payload: any) => ({ type: constants.UPDATE_CANCEL_WORK_PERMITS, payload }),
}

export const Selectors = {
  selectCancelWorkPermits: (state: any) => unResolveEntity(state, stateName).cancel_work_permits
}