import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchManagersBody, FetchManagersBodyTag, CreateManagerBody, CreateManagerBodyTag,
  UpdateManagerBody, UpdateManagerBodyTag, RemoveManagerBody, RemoveManagerBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IManagerEdit, IManagerInput } from "src/models/InvestmentModels/manager"

export const stateName = "managers"

const constants = {
  "FETCH_MANAGERS": "FETCH_MANAGERS",
  "SELECT_MANAGER": "SELECT_MANAGER",
  "REMOVE_MANAGER": "REMOVE_MANAGER",
}

const initialState = {
  managers: [],
  selected_manager: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_MANAGERS: {
      return {
        ...state, managers: action.payload
      }
    }

    case constants.SELECT_MANAGER: {
      return {
        ...state, selected_manager: action.payload
      }
    }

    case constants.REMOVE_MANAGER: {
      return {
        ...state, managers: state.managers.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectManagers: (state: any) => unResolveEntity(state, stateName).managers,
  selectSelectedManager: (state: any) => unResolveEntity(state, stateName).selected_manager
}

export const API = {
  FetchManagers: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchManagersBody())
      .then((res: any) => callback(null, res.data.data[FetchManagersBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateManager: (input: IManagerInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateManagerBody(input))
      .then((res: any) => callback(null, res.data.data[CreateManagerBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditManager: (input: IManagerEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateManagerBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateManagerBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveManager: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveManagerBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveManagerBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedManagers: (payload: any) => ({ type: constants.FETCH_MANAGERS, payload }),
  SelectManager: (payload: any) => ({ type: constants.SELECT_MANAGER, payload }),
  RemoveManager: (payload: any) => ({ type: constants.REMOVE_MANAGER, payload }),
}