import { Schema } from "mongoose"
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "../../Common/interface"
import { IEmployeeCount, IPermitDocument, IProjectCost, IProjectInput, IRawMaterial, IProjectShare } from "./required.types"

export { IBasicID, IBasicIDs }

export const GQLResponseTag = "IWorkPermitSimple"

export interface IWorkPermitResolver {
  Query: IWorkPermitQuery
  Mutation: IWorkPermitMutation
}

export interface IWorkPermitQuery {
  fetchWorkPermits: (parent: any, args: any, context: any) => Promise<IWorkPermitDoc<IWorkPermit[]>>
  fetchOneWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IWorkPermitDoc<IWorkPermit>>
  fetchManyWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IWorkPermitDoc<IWorkPermit[]>>
}

export interface IWorkPermitMutation {
  postWorkPermit: (parent: any, args: IPostWorkPermit, context: any) => Promise<IWorkPermitDoc<IWorkPermit>>
  editWorkPermit: (parent: any, args: IEditWorkPermit, context: any) => Promise<IWorkPermitDoc<IWorkPermit>>
  removeOneWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IWorkPermitDoc<IWorkPermit>>
  removeManyWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IWorkPermitDoc<IWorkPermit[]>>
  removeAllWorkPermits: (parent: any, args: any, context: any) => Promise<IWorkPermitDoc<string>>
}

export interface IWorkPermit extends IBasicDoc {
  project: Schema.Types.ObjectId
  start_date: Date
  end_date: Date
  previous_permit_number: String
  project_input: IProjectInput
  raw_materials: IRawMaterial[]
  project_cost: IProjectCost
  permanent_employee_count: IEmployeeCount
  temporary_employee_count: IEmployeeCount
  project_shares: IProjectShare[]
  products: Schema.Types.ObjectId[]
  permit_documents: IPermitDocument
  selected_manager: Schema.Types.ObjectId
}

export interface IWorkPermitDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IWorkPermitInput {
  project: Schema.Types.ObjectId
  start_date: Date
  end_date: Date
  previous_permit_number: String
  project_input: IProjectInput
  raw_materials: IRawMaterial[]
  project_cost: IProjectCost
  permanent_employee_count: IEmployeeCount
  temporary_employee_count: IEmployeeCount
  project_shares: IProjectShare[]
  products: Schema.Types.ObjectId[]
  permit_documents: IPermitDocument
  selected_manager: Schema.Types.ObjectId
}


export interface IWorkPermitEdit {
  _id: string
  project?: Schema.Types.ObjectId
  start_date?: Date
  end_date?: Date
  previous_permit_number?: String
  project_input?: IProjectInput
  raw_materials?: IRawMaterial[]
  project_cost?: IProjectCost
  permanent_employee_count?: IEmployeeCount
  temporary_employee_count?: IEmployeeCount
  project_shares?: IProjectShare[]
  products?: Schema.Types.ObjectId[]
  permit_documents?: IPermitDocument
  selected_manager?: Schema.Types.ObjectId
}

export interface IPostWorkPermit {
  input: IWorkPermitInput
}

export interface IEditWorkPermit {
  input: IWorkPermitEdit
}