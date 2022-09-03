import Axios from "axios"
import { unResolveEntity } from "src/helpers/resolveEntity"
import endPoints from "src/constants/endPoints"
import {
  FetchWorkPermitsBody, FetchWorkPermitsBodyTag,
  UpdateWorkPermitStatusBody, UpdateWorkPermitStatusBodyTag,
  FetchUnAssignedWorkPermitsBody, FetchUnAssignedWorkPermitsBodyTag,
  FetchAssignedWorkPermitsBody, FetchAssignedWorkPermitsBodyTag,
  AssignEmployeeToWorkPermitBody, AssignEmployeeToWorkPermitBodyTag, InputAssignEmployeeToWorkPermitBody,
  FetchAdminWorkPermitsBody, FetchAdminWorkPermitsBodyTag, InputFetchAdminWorkPermitsBody
} from './query'

export const API = {
  FetchWorkPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchWorkPermitsBody())
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchWorkPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  FetchUnAssignedWorkPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchUnAssignedWorkPermitsBody())
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchUnAssignedWorkPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  FetchAssignedWorkPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchAssignedWorkPermitsBody())
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchAssignedWorkPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  UpdateWorkPermitStatus: (input: { _id: string; permit_status: string }, callback: Function) => {
    Axios.post(endPoints.baseURL, UpdateWorkPermitStatusBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[UpdateWorkPermitStatusBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  AssignEmployeeToWorkPermitBody: (input: InputAssignEmployeeToWorkPermitBody, callback: Function) => {
    Axios.post(endPoints.baseURL, AssignEmployeeToWorkPermitBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[AssignEmployeeToWorkPermitBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  FetchAdminWorkPermits: (input: InputFetchAdminWorkPermitsBody, callback: Function) => {
    Axios.post(endPoints.baseURL, FetchAdminWorkPermitsBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchAdminWorkPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  }
}

export const stateName = "work_permits"

const initialState = {
  work_permits: []
}

const constants = {
  "SET_WORK_PERMITS": "SET_WORK_PERMITS",
  "UPDATE_WORK_PERMITS": "UPDATE_WORK_PERMITS",
}

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case constants.SET_WORK_PERMITS: {
      return {
        ...state, work_permits: action.payload
      }
    }

    case constants.UPDATE_WORK_PERMITS: {
      return {
        ...state, work_permits: state.work_permits.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setWorkPermits: (payload: any[]) => ({ type: constants.SET_WORK_PERMITS, payload }),
  UpdateWorkPermits: (payload: any) => ({ type: constants.UPDATE_WORK_PERMITS, payload }),
}

export const Selectors = {
  selectWorkPermits: (state: any) => unResolveEntity(state, stateName).work_permits
}