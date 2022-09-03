import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchWorkPermitsBody, FetchWorkPermitsBodyTag, CreateWorkPermitBody, CreateWorkPermitBodyTag,
  UpdateWorkPermitBody, UpdateWorkPermitBodyTag, RemoveWorkPermitBody, RemoveWorkPermitBodyTag,
  RenewWorkPermitBody, RenewWorkPermitBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IWorkPermitEdit, IWorkPermitInput } from "src/models/InvestmentModels/work_permit"

export const stateName = "work_permits"

const constants = {
  "FETCH_WORK_PERMITS": "FETCH_WORK_PERMITS",
  "SELECT_WORK_PERMIT": "SELECT_WORK_PERMIT",
  "REMOVE_WORK_PERMIT": "REMOVE_WORK_PERMIT",
  "UPDATE_WORK_PERMIT": "UPDATE_WORK_PERMIT",
}

const initialState = {
  work_permits: [],
  selected_work_permit: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_WORK_PERMITS: {
      return {
        ...state, work_permits: action.payload
      }
    }

    case constants.SELECT_WORK_PERMIT: {
      return {
        ...state, selected_work_permit: action.payload
      }
    }

    case constants.REMOVE_WORK_PERMIT: {
      return {
        ...state, work_permits: state.work_permits.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    case constants.UPDATE_WORK_PERMIT: {
      return {
        ...state, work_permits: state.work_permits.map(
          (item: any) => String(item._id) === String(action.payload._id) ? action.payload : item
        )
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectWorkPermits: (state: any) => unResolveEntity(state, stateName).work_permits,
  selectSelectedWorkPermit: (state: any) => unResolveEntity(state, stateName).selected_work_permit
}

export const API = {
  FetchWorkPermits: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchWorkPermitsBody())
      .then((res: any) => callback(null, res.data.data[FetchWorkPermitsBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateWorkPermit: (input: IWorkPermitInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateWorkPermitBody(input))
      .then((res: any) => callback(null, res.data.data[CreateWorkPermitBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditWorkPermit: (input: IWorkPermitEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateWorkPermitBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateWorkPermitBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RenewWorkPermit: (input: { _id: string; end_date: Date; }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RenewWorkPermitBody(input))
      .then((res: any) => callback(null, res.data.data[RenewWorkPermitBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveWorkPermit: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveWorkPermitBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveWorkPermitBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedWorkPermits: (payload: any) => ({ type: constants.FETCH_WORK_PERMITS, payload }),
  SelectWorkPermit: (payload: any) => ({ type: constants.SELECT_WORK_PERMIT, payload }),
  RemoveWorkPermit: (payload: any) => ({ type: constants.REMOVE_WORK_PERMIT, payload }),
  UpdateWorkPermit: (payload: any) => ({ type: constants.UPDATE_WORK_PERMIT, payload }),
}