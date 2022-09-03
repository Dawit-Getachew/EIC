import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchActivitiesBody, FetchActivitiesBodyTag, CreateActivityBody, CreateActivityBodyTag,
  UpdateActivityBody, UpdateActivityBodyTag, RemoveActivityBody, RemoveActivityBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IActivityEdit, IActivityInput } from "src/models/InvestmentModels/Category/activity"

export const stateName = "activities"

const constants = {
  "FETCH_ACTIVITIES": "FETCH_ACTIVITIES",
  "SELECT_ACTIVITY": "SELECT_ACTIVITY",
  "REMOVE_ACTIVITY": "REMOVE_ACTIVITY"
}

const initialState = {
  activities: [],
  selected_activity: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_ACTIVITIES: {
      return {
        ...state, activities: action.payload
      }
    }

    case constants.SELECT_ACTIVITY: {
      return {
        ...state, selected_activity: action.payload
      }
    }

    case constants.REMOVE_ACTIVITY: {
      return {
        ...state, activities: state.activities.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectActivities: (state: any) => unResolveEntity(state, stateName).activities,
  selectSelectedActivity: (state: any) => unResolveEntity(state, stateName).selected_activity
}

export const API = {
  FetchActivities: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchActivitiesBody())
      .then((res: any) => callback(null, res.data.data[FetchActivitiesBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateActivity: (input: IActivityInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateActivityBody(input))
      .then((res: any) => callback(null, res.data.data[CreateActivityBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditActivity: (input: IActivityEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateActivityBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateActivityBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveActivity: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveActivityBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveActivityBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedActivities: (payload: any) => ({ type: constants.FETCH_ACTIVITIES, payload }),
  SelectActivity: (payload: any) => ({ type: constants.SELECT_ACTIVITY, payload }),
  RemoveActivity: (payload: any) => ({ type: constants.REMOVE_ACTIVITY, payload }),
}