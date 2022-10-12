import { Schema } from "mongoose";
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "../../Common/interface";

export { IBasicID, IBasicIDs }

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
  category_sector: Schema.Types.ObjectId
  category_sub_sector: Schema.Types.ObjectId
  category_activity: Schema.Types.ObjectId
  category_investment_activity: Schema.Types.ObjectId
}

export interface IProjectDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IProjectInput {
  title: string
  project_stage: ProjectStages
  environmental_impact: string
  project_summary: string
  address: IBusinessAddress
  category_sector: Schema.Types.ObjectId
  category_sub_sector: Schema.Types.ObjectId
  category_activity: Schema.Types.ObjectId
  category_investment_activity: Schema.Types.ObjectId
}


export interface IProjectEdit {
  _id: string
  title?: string
  project_stage?: ProjectStages
  environmental_impact?: string
  project_summary?: string
  address?: IBusinessAddress
  category_sector?: Schema.Types.ObjectId
  category_sub_sector?: Schema.Types.ObjectId
  category_activity?: Schema.Types.ObjectId
  category_investment_activity?: Schema.Types.ObjectId
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