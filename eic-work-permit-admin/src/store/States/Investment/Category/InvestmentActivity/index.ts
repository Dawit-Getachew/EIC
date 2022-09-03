import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchInvestmentActivitiesBody, FetchInvestmentActivitiesBodyTag, CreateInvestmentActivityBody, CreateInvestmentActivityBodyTag,
  UpdateInvestmentActivityBody, UpdateInvestmentActivityBodyTag, RemoveInvestmentActivityBody, RemoveInvestmentActivityBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IInvestmentActivityEdit, IInvestmentActivityInput } from "src/models/InvestmentModels/Category/investment_activity"

export const stateName = "investment_activities"

const constants = {
  "FETCH_INVESTMENT_ACTIVITIES": "FETCH_INVESTMENT_ACTIVITIES",
  "SELECT_INVESTMENT_ACTIVITY": "SELECT_INVESTMENT_ACTIVITY",
  "REMOVE_INVESTMENT_ACTIVITY": "REMOVE_INVESTMENT_ACTIVITY",
}

const initialState = {
  investment_activities: [],
  selected_investment_activity: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_INVESTMENT_ACTIVITIES: {
      return {
        ...state, investment_activities: action.payload
      }
    }

    case constants.SELECT_INVESTMENT_ACTIVITY: {
      return {
        ...state, selected_investment_activity: action.payload
      }
    }

    case constants.REMOVE_INVESTMENT_ACTIVITY: {
      return {
        ...state, investment_activities: state.investment_activities.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectInvestmentActivities: (state: any) => unResolveEntity(state, stateName).investment_activities,
  selectSelectedInvestmentActivity: (state: any) => unResolveEntity(state, stateName).selected_investment_activity
}

export const API = {
  FetchInvestmentActivities: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchInvestmentActivitiesBody())
      .then((res: any) => callback(null, res.data.data[FetchInvestmentActivitiesBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateInvestmentActivity: (input: IInvestmentActivityInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateInvestmentActivityBody(input))
      .then((res: any) => callback(null, res.data.data[CreateInvestmentActivityBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditInvestmentActivity: (input: IInvestmentActivityEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateInvestmentActivityBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateInvestmentActivityBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveInvestmentActivity: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveInvestmentActivityBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveInvestmentActivityBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedInvestmentActivities: (payload: any) => ({ type: constants.FETCH_INVESTMENT_ACTIVITIES, payload }),
  SelectInvestmentActivity: (payload: any) => ({ type: constants.SELECT_INVESTMENT_ACTIVITY, payload }),
  RemoveInvestmentActivity: (payload: any) => ({ type: constants.REMOVE_INVESTMENT_ACTIVITY, payload }),
}