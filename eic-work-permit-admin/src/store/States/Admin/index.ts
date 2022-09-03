import Axios from "axios"
import { unResolveEntity } from "src/helpers/resolveEntity"
import endPoints from "src/constants/endPoints"
import {
  FetchAdminsBody, FetchAdminsBodyTag,
  FetchAdminWorkPermitsBody, FetchAdminWorkPermitsBodyTag, InputFetchAdminWorkPermitsBody,
  PostAdminBody, PostAdminBodyTag,
  EditAdminBody, EditAdminBodyTag
} from './query'
import { IAccountInput, IAccountEdit } from "./types"

export const API = {
  FetchAdmins: (callback: Function) => {
    Axios.post(endPoints.baseURL, FetchAdminsBody())
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchAdminsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  FetchAdminWorkPermitsBody: (input: InputFetchAdminWorkPermitsBody, callback: Function) => {
    Axios.post(endPoints.baseURL, FetchAdminWorkPermitsBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[FetchAdminWorkPermitsBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  PostAdmin: (input: IAccountInput, callback: Function) => {
    Axios.post(endPoints.baseURL, PostAdminBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[PostAdminBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  },
  EditAdmin: (input: IAccountEdit, callback: Function) => {
    Axios.post(endPoints.baseURL, EditAdminBody(input))
      .then(res => {
        if (res.status === 200) {
          callback(null, res.data.data[EditAdminBodyTag])
        } else {
          callback(res, null)
        }
      })
      .catch(err => callback(err, null))
  }
}

export const stateName = "admins"

const initialState = {
  admins: []
}

const constants = {
  "SET_ADMINS": "SET_ADMINS",
  "UPDATE_ADMINS": "UPDATE_ADMINS",
  "ADD_ADMIN": "ADD_ADMIN",
}

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case constants.SET_ADMINS: {
      return {
        ...state, admins: action.payload
      }
    }

    case constants.UPDATE_ADMINS: {
      return {
        ...state, admins: state.admins.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }

    case constants.ADD_ADMIN: {
      return {
        ...state, admins: state.admins.concat(action.payload)
      }
    }
    default: return state
  }
}

export const Actions = {
  setAdmins: (payload: any[]) => ({ type: constants.SET_ADMINS, payload }),
  UpdateAdmins: (payload: any) => ({ type: constants.UPDATE_ADMINS, payload }),
  AddAdmins: (payload: any) => ({ type: constants.ADD_ADMIN, payload }),
}

export const Selectors = {
  selectAdmins: (state: any) => unResolveEntity(state, stateName).admins
}