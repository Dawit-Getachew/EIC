import Axios from "axios"
import { unResolveEntity } from "src/helpers/resolveEntity"
import endPoints from "src/constants/endPoints"
import {
  FetchReplaceWorkPermitsBody, FetchReplaceWorkPermitsBodyTag,
  IUpdatePermitStatus, UpdateRepalceWorkPermitStatusBody, UpdateRepalceWorkPermitStatusBodyTag
} from './query'

export const API = {
  FetchReplaceWorkPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchReplaceWorkPermitsBody())
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchReplaceWorkPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  UpdateRepalceWorkPermitStatus: (input: IUpdatePermitStatus, callback: Function) => {
    Axios.post(endPoints.baseURL, UpdateRepalceWorkPermitStatusBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[UpdateRepalceWorkPermitStatusBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
}

export const stateName = "replace_work_permits"

const initialState = {
  replace_work_permits: []
}

const constants = {
  "SET_REPLACE_WORK_PERMITS": "SET_REPLACE_WORK_PERMITS",
  "UPDATE_REPLACE_WORK_PERMITS": "UPDATE_REPLACE_WORK_PERMITS",
}

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case constants.SET_REPLACE_WORK_PERMITS: {
      return {
        ...state, replace_work_permits: action.payload
      }
    }

    case constants.UPDATE_REPLACE_WORK_PERMITS: {
      return {
        ...state, replace_work_permits: state.replace_work_permits.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setReplaceWorkPermits: (payload: any[]) => ({ type: constants.SET_REPLACE_WORK_PERMITS, payload }),
  UpdateReplaceWorkPermits: (payload: any) => ({ type: constants.UPDATE_REPLACE_WORK_PERMITS, payload }),
}

export const Selectors = {
  selectReplaceWorkPermits: (state: any) => unResolveEntity(state, stateName).replace_work_permits
}