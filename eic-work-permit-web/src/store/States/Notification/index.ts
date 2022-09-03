import { unResolveEntity } from "src/helpers/resolveEntity"
import Axios from "axios"
import {
  FetchNotificationBody, FetchNotificationBodyTag,
  UpdateStatusNotificationBody, UpdateStatusNotificationBodyTag,
  CreateNotificationBody, CreateNotificationBodyTag
} from "./query"
import endPoints from "src/constants/endPoints"

export const stateName = "notifications"

const initialState = {
  notifications: []
}

const constants = {
  "SET_NOTIFICATION_RENEWALS": "SET_NOTIFICATION_RENEWALS",
  "UPDATE_NOTIFICATION_RENEWALS": "UPDATE_NOTIFICATION_RENEWALS",
  "ADD_NOTIFICATION_RENEWAL": "ADD_NOTIFICATION_RENEWAL",
}

export const reducer = (state: any = initialState, action: any) => {
  switch(action.type) {
    case constants.SET_NOTIFICATION_RENEWALS: {
      return {
        ...state, notifications: action.payload
      }
    }

    case constants.ADD_NOTIFICATION_RENEWAL: {
      return {
        ...state, notifications: state.notifications.concat(action.payload)
      }
    }

    case constants.UPDATE_NOTIFICATION_RENEWALS: {
      return {
        ...state, notifications: state.notifications.map(item => String(item._id) === String(action.payload._id) ? action.payload : item)
      }
    }
    default: return state
  }
}

export const Actions = {
  setNotifications: (payload: any[]) => ({ type: constants.SET_NOTIFICATION_RENEWALS, payload }),
  UpdateNotifications: (payload: any) => ({ type: constants.UPDATE_NOTIFICATION_RENEWALS, payload }),
  AddNotification: (payload: any) => ({ type: constants.ADD_NOTIFICATION_RENEWAL, payload }),
}

export const Selectors = {
  selectNotifications: (state: any) => unResolveEntity(state, stateName).notifications
}

export const API = {
  FetchNotifications: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchNotificationBody())
      .then(response => {
        if (response.data.data[FetchNotificationBodyTag]) {
          callback(null, response.data.data[FetchNotificationBodyTag])
        } else {
          callback({ value: "Unknown error" }, null)
        }
      })
      .catch(err => console.log("Error", err))
  },
  UpdateStatusNotification: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateStatusNotificationBody({ _id }))
    .then(response => {
      if (response.data.data[UpdateStatusNotificationBodyTag]) {
        callback(null, response.data.data[UpdateStatusNotificationBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  CreateNotification: ({ investment_id, service_id }: { investment_id: string, service_id: string }, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateNotificationBody({ investment_id, service_id }))
    .then(response => {
      if (response.data.data[CreateNotificationBodyTag]) {
        callback(null, response.data.data[CreateNotificationBodyTag])
      } else {
        callback({ value: "Unknown error" }, null)
      }
    })
    .catch(err => console.log("Error", err))
  },
  RemoveNotification: (_id: string, callback = (err: any, data: any) => null) => {}
}