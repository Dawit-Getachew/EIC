import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchProjectsBody, FetchProjectsBodyTag, CreateProjectBody, CreateProjectBodyTag,
  UpdateProjectBody, UpdateProjectBodyTag, RemoveProjectBody, RemoveProjectBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IProjectEdit, IProjectInput } from "src/models/InvestmentModels/project"

export const stateName = "projects"

const constants = {
  "FETCH_PROJECTS": "FETCH_PROJECTS",
  "SELECT_PROJECT": "SELECT_PROJECT",
  "REMOVE_PROJECT": "REMOVE_PROJECT",
}

const initialState = {
  projects: [],
  selected_project: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_PROJECTS: {
      return {
        ...state, projects: action.payload
      }
    }

    case constants.SELECT_PROJECT: {
      return {
        ...state, selected_project: action.payload
      }
    }

    case constants.REMOVE_PROJECT: {
      return {
        ...state, projects: state.projects.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectProjects: (state: any) => unResolveEntity(state, stateName).projects,
  selectSelectedProject: (state: any) => unResolveEntity(state, stateName).selected_project
}

export const API = {
  FetchProjects: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchProjectsBody())
      .then((res: any) => callback(null, res.data.data[FetchProjectsBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateProject: (input: IProjectInput, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateProjectBody(input))
      .then((res: any) => callback(null, res.data.data[CreateProjectBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditProject: (input: IProjectEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateProjectBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateProjectBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveProject: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveProjectBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveProjectBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedProjects: (payload: any) => ({ type: constants.FETCH_PROJECTS, payload }),
  SelectProject: (payload: any) => ({ type: constants.SELECT_PROJECT, payload }),
  RemoveProject: (payload: any) => ({ type: constants.REMOVE_PROJECT, payload }),
}