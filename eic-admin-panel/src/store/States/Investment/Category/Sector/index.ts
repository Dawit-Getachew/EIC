import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchSectorsBody, FetchSectorsBodyTag, CreateSectorBody, CreateSectorBodyTag,
  UpdateSectorBody, UpdateSectorBodyTag, RemoveSectorBody, RemoveSectorBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { ISectorEdit, ISectorInput } from "src/models/InvestmentModels/Category/sector"

export const stateName = "sectors"

const constants = {
  "FETCH_SECTORS": "FETCH_SECTORS",
  "SELECT_SECTOR": "SELECT_SECTOR",
  "REMOVE_SECTOR": "REMOVE_SECTOR",
}

const initialState = {
  sectors: [],
  selected_sector: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_SECTORS: {
      return {
        ...state, sectors: action.payload
      }
    }

    case constants.SELECT_SECTOR: {
      return {
        ...state, selected_sector: action.payload
      }
    }

    case constants.REMOVE_SECTOR: {
      return {
        ...state, sectors: state.sectors.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectSectors: (state: any) => unResolveEntity(state, stateName).sectors,
  selectSelectedSector: (state: any) => unResolveEntity(state, stateName).selected_sector
}

export const API = {
  FetchSectors: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchSectorsBody())
      .then((res: any) => callback(null, res.data.data[FetchSectorsBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateSector: (input: ISectorInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateSectorBody(input))
      .then((res: any) => callback(null, res.data.data[CreateSectorBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditSector: (input: ISectorEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateSectorBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateSectorBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveSector: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveSectorBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveSectorBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedSectors: (payload: any) => ({ type: constants.FETCH_SECTORS, payload }),
  SelectSector: (payload: any) => ({ type: constants.SELECT_SECTOR, payload }),
  RemoveSector: (payload: any) => ({ type: constants.REMOVE_SECTOR, payload }),
}