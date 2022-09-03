import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { unResolveEntity } from "src/helpers/resolveEntity"
import { IWorkPermitInput } from "./types"
import {
  CreateWorkPermitBody, CreateWorkPermitBodyTag,
  FetchWorkPermitsBody, FetchWorkPermitsBodyTag,
  UpdateServiceFeeBody, UpdateServiceFeeBodyTag
} from "./query"

export const API = {
  CreateWorkPermit: (input: IWorkPermitInput, callback: Function) => {
    Axios.post(endPoints.baseURL, CreateWorkPermitBody(input))
      .then(res => {
        callback(null, res.data.data[CreateWorkPermitBodyTag])
      })
      .catch(err => callback(err, null))
  },
  FetchWorkPermits: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchWorkPermitsBody())
      .then(res => {
        callback(null, res.data.data[FetchWorkPermitsBodyTag])
      })
      .catch(err => callback(err, null))
  },
  UpdateServiceFee: (input: { _id: string; service_fee: string; },callback: Function) => {
    Axios.post(endPoints.baseURL, UpdateServiceFeeBody(input))
      .then(res => {
        callback(null, res.data.data[UpdateServiceFeeBodyTag])
      })
      .catch(err => callback(err, null))
  },
}

export const stateName = "workPermits"

const initialState = {
  workPermits: []
}

const constants = {
  "SET_WORK_PERMITS": "SET_WORK_PERMITS"
}

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case constants.SET_WORK_PERMITS: {
      return {
        ...state, workPermits: action.payload
      }
    }
    default: return state
  }
}

export const Actions = {
  setWorkPermits: (payload: any[]) => ({ type: constants.SET_WORK_PERMITS, payload })
}

export const Selectors = {
  selectWorkPermits: (state: any) => unResolveEntity(state, stateName).workPermits
}