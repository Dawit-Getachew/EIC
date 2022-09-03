import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "src/common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IProjectSimple"

export interface IProjectResolver {
  Query: IProjectQuery
  Mutation: IProjectMutation
}

export interface IProjectQuery {
  fetchProjects: (parent: any, args: any, context: any) => Promise<IProjectDoc<IProject[]>>
  fetchOneProjectByID: (parent: any, args: IBasicID, context: any) => Promise<IProjectDoc<IProject>>
  fetchManyProjectsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IProjectDoc<IProject[]>>
}

export interface IProjectMutation {
  postProject: (parent: any, args: IPostProject, context: any) => Promise<IProjectDoc<IProject>>
  editProject: (parent: any, args: IEditProject, context: any) => Promise<IProjectDoc<IProject>>
  removeOneProjectByID: (parent: any, args: IBasicID, context: any) => Promise<IProjectDoc<IProject>>
  removeManyProjectsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IProjectDoc<IProject[]>>
  removeAllProjects: (parent: any, args: any, context: any) => Promise<IProjectDoc<string>>
}

export interface IProject extends IBasicDoc {
  title: string
  project_stage: ProjectStages
  environmental_impact: string
  project_summary: string
  address: IBusinessAddress
  category_sector: string
  category_sub_sector: string
  category_activity: string
  category_investment_activity: string
}

export interface IProjectDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IProjectInput {
  title: string
  project_stage: ProjectStages
  environmental_impact: string
  project_summary: string
  address: IBusinessAddress
  category_sector: string
  category_sub_sector: string
  category_activity: string
  category_investment_activity: string
}


export interface IProjectEdit {
  _id: string
  title?: string
  project_stage?: ProjectStages
  environmental_impact?: string
  project_summary?: string
  address?: IBusinessAddress
  category_sector?: string
  category_sub_sector?: string
  category_activity?: string
  category_investment_activity?: string
}

export interface IPostProject {
  input: IProjectInput
}

export interface IEditProject {
  input: IProjectEdit
}

export enum ProjectStages {
  INITIAL = "INITIAL",
}