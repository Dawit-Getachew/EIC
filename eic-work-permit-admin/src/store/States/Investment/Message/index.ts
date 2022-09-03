import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchMessagesBody, FetchMessagesBodyTag, CreateMessageBody, CreateMessageBodyTag,
  UpdateMessageBody, UpdateMessageBodyTag, RemoveMessageBody, RemoveMessageBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IMessageEdit, IMessageInput } from "src/models/InvestmentModels/message"

export const stateName = "messages"

const constants = {
  "FETCH_MESSAGES": "FETCH_MESSAGES",
  "SELECT_MESSAGE": "SELECT_MESSAGE",
  "REMOVE_MESSAGE": "REMOVE_MESSAGE",
  "ADD_MESSAGE": "ADD_MESSAGE",
}

const initialState = {
  messages: [],
  selected_message: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_MESSAGES: {
      return {
        ...state, messages: action.payload
      }
    }

    case constants.SELECT_MESSAGE: {
      return {
        ...state, selected_message: action.payload
      }
    }

    case constants.REMOVE_MESSAGE: {
      return {
        ...state, messages: state.messages.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    case constants.ADD_MESSAGE: {
      return {
        ...state, messages: [action.payload, ...state.messages]
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectMessages: (state: any) => unResolveEntity(state, stateName).messages,
  selectSelectedMessage: (state: any) => unResolveEntity(state, stateName).selected_message
}

export const API = {
  FetchMessages: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchMessagesBody())
      .then((res: any) => callback(null, res.data.data[FetchMessagesBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateMessage: (input: IMessageInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateMessageBody(input))
      .then((res: any) => callback(null, res.data.data[CreateMessageBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditMessage: (input: IMessageEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateMessageBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateMessageBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveMessage: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveMessageBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveMessageBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedMessages: (payload: any) => ({ type: constants.FETCH_MESSAGES, payload }),
  SelectMessage: (payload: any) => ({ type: constants.SELECT_MESSAGE, payload }),
  RemoveMessage: (payload: any) => ({ type: constants.REMOVE_MESSAGE, payload }),
  AddMessage: (payload: any) => ({ type: constants.ADD_MESSAGE, payload }),
}