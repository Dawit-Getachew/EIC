import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchBusinessProfilesBody, FetchBusinessProfilesBodyTag, CreateBusinessProfileBody, CreateBusinessProfileBodyTag,
  UpdateBusinessProfileBody, UpdateBusinessProfileBodyTag, RemoveBusinessProfileBody, RemoveBusinessProfileBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IBusinessProfileEdit, IBusinessProfileInput } from "src/models/InvestmentModels/business_profile"

export const stateName = "business_profiles"

const constants = {
  "FETCH_BUSINESS_PROFILES": "FETCH_BUSINESS_PROFILES",
  "SELECT_BUSINESS_PROFILE": "SELECT_BUSINESS_PROFILE",
  "REMOVE_BUSINESS_PROFILE": "REMOVE_BUSINESS_PROFILE",
}

const initialState = {
  business_profiles: [],
  selected_business_profile: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_BUSINESS_PROFILES: {
      return {
        ...state, business_profiles: action.payload
      }
    }

    case constants.SELECT_BUSINESS_PROFILE: {
      return {
        ...state, selected_business_profile: action.payload
      }
    }

    case constants.REMOVE_BUSINESS_PROFILE: {
      return {
        ...state, business_profiles: state.business_profiles.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectBusinessProfiles: (state: any) => unResolveEntity(state, stateName).business_profiles,
  selectSelectedBusinessProfile: (state: any) => unResolveEntity(state, stateName).selected_business_profile
}

export const API = {
  FetchBusinessProfiles: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchBusinessProfilesBody())
      .then((res: any) => callback(null, res.data.data[FetchBusinessProfilesBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateBusinessProfile: (input: IBusinessProfileInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateBusinessProfileBody(input))
      .then((res: any) => callback(null, res.data.data[CreateBusinessProfileBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditBusinessProfile: (input: IBusinessProfileEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateBusinessProfileBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateBusinessProfileBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveBusinessProfile: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveBusinessProfileBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveBusinessProfileBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedBusinessProfiles: (payload: any) => ({ type: constants.FETCH_BUSINESS_PROFILES, payload }),
  SelectBusinessProfile: (payload: any) => ({ type: constants.SELECT_BUSINESS_PROFILE, payload }),
  RemoveBusinessProfile: (payload: any) => ({ type: constants.REMOVE_BUSINESS_PROFILE, payload }),
}