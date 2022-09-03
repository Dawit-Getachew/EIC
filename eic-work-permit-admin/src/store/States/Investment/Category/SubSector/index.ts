import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchSubSectorsBody, FetchSubSectorsBodyTag, CreateSubSectorBody, CreateSubSectorBodyTag,
  UpdateSubSectorBody, UpdateSubSectorBodyTag, RemoveSubSectorBody, RemoveSubSectorBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { ISubSectorEdit, ISubSectorInput } from "src/models/InvestmentModels/Category/sub_sector"

export const stateName = "sub_sectors"

const constants = {
  "FETCH_SUB_SECTORS": "FETCH_SUB_SECTORS",
  "SELECT_SUB_SECTOR": "SELECT_SUB_SECTOR",
  "REMOVE_SUB_SECTOR": "REMOVE_SUB_SECTOR",
}

const initialState = {
  sub_sectors: [],
  selected_sub_sector: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_SUB_SECTORS: {
      return {
        ...state, sub_sectors: action.payload
      }
    }

    case constants.SELECT_SUB_SECTOR: {
      return {
        ...state, selected_sub_sector: action.payload
      }
    }

    case constants.REMOVE_SUB_SECTOR: {
      return {
        ...state, sub_sectors: state.sub_sectors.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectSubSectors: (state: any) => unResolveEntity(state, stateName).sub_sectors,
  selectSelectedSubSector: (state: any) => unResolveEntity(state, stateName).selected_sub_sector
}

export const API = {
  FetchSubSectors: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchSubSectorsBody())
      .then((res: any) => callback(null, res.data.data[FetchSubSectorsBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateSubSector: (input: ISubSectorInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateSubSectorBody(input))
      .then((res: any) => callback(null, res.data.data[CreateSubSectorBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditSubSector: (input: ISubSectorEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateSubSectorBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateSubSectorBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveSubSector: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveSubSectorBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveSubSectorBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedSubSectors: (payload: any) => ({ type: constants.FETCH_SUB_SECTORS, payload }),
  SelectSubSector: (payload: any) => ({ type: constants.SELECT_SUB_SECTOR, payload }),
  RemoveSubSector: (payload: any) => ({ type: constants.REMOVE_SUB_SECTOR, payload }),
}