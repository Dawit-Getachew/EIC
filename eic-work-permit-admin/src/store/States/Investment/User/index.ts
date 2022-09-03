import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchUsersBody, FetchUsersBodyTag, CreateUserBody, CreateUserBodyTag,
  UpdateUserBody, UpdateUserBodyTag, RemoveUserBody, RemoveUserBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IUserEdit, IUserInput } from "src/models/InvestmentModels/user"

export const stateName = "users"

const constants = {
  "FETCH_USERS": "FETCH_USERS",
  "SELECT_USER": "SELECT_USER",
  "REMOVE_USER": "REMOVE_USER",
}

const initialState = {
  users: [],
  selected_user: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_USERS: {
      return {
        ...state, users: action.payload
      }
    }

    case constants.SELECT_USER: {
      return {
        ...state, selected_user: action.payload
      }
    }

    case constants.REMOVE_USER: {
      return {
        ...state, users: state.users.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectUsers: (state: any) => unResolveEntity(state, stateName).users,
  selectSelectedUser: (state: any) => unResolveEntity(state, stateName).selected_user
}

export const API = {
  FetchUsers: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchUsersBody())
      .then((res: any) => callback(null, res.data.data[FetchUsersBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateUser: (input: IUserInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateUserBody(input))
      .then((res: any) => callback(null, res.data.data[CreateUserBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditUser: (input: IUserEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateUserBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateUserBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveUser: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveUserBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveUserBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedUsers: (payload: any) => ({ type: constants.FETCH_USERS, payload }),
  SelectUser: (payload: any) => ({ type: constants.SELECT_USER, payload }),
  RemoveUser: (payload: any) => ({ type: constants.REMOVE_USER, payload }),
}