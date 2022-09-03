import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchAccountsBody, FetchAccountsBodyTag, CreateAccountBody, CreateAccountBodyTag,
  UpdateAccountBody, UpdateAccountBodyTag, RemoveAccountBody, RemoveAccountBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IAccountEdit, IAccountInput } from "src/models/InvestmentModels/account"

export const stateName = "accounts"

const constants = {
  "FETCH_ACCOUNTS": "FETCH_ACCOUNTS",
  "SELECT_ACCOUNT": "SELECT_ACCOUNT",
  "REMOVE_ACCOUNT": "REMOVE_ACCOUNT",
}

const initialState = {
  accounts: [],
  selected_account: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_ACCOUNTS: {
      return {
        ...state, accounts: action.payload
      }
    }

    case constants.SELECT_ACCOUNT: {
      return {
        ...state, selected_account: action.payload
      }
    }

    case constants.REMOVE_ACCOUNT: {
      return {
        ...state, accounts: state.accounts.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectAccounts: (state: any) => unResolveEntity(state, stateName).accounts,
  selectSelectedAccount: (state: any) => unResolveEntity(state, stateName).selected_account
}

export const API = {
  FetchAccounts: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchAccountsBody())
      .then((res: any) => callback(null, res.data.data[FetchAccountsBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateAccount: (input: IAccountInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateAccountBody(input))
      .then((res: any) => callback(null, res.data.data[CreateAccountBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditAccount: (input: IAccountEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateAccountBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateAccountBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveAccount: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveAccountBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveAccountBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedAccounts: (payload: any) => ({ type: constants.FETCH_ACCOUNTS, payload }),
  SelectAccount: (payload: any) => ({ type: constants.SELECT_ACCOUNT, payload }),
  RemoveAccount: (payload: any) => ({ type: constants.REMOVE_ACCOUNT, payload }),
}