import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "src/common/interface"
import { IEmployeeCount, IPermitDocument, IProjectCost, IProjectInput, IRawMaterial, IProjectShare } from "./work_permit_required"

export type { IBasicID, IBasicIDs }

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
  project: string
  start_date: Date
  end_date: Date
  previous_permit_number: String
  project_input: IProjectInput
  raw_materials: IRawMaterial[]
  project_cost: IProjectCost
  permanent_employee_count: IEmployeeCount
  temporary_employee_count: IEmployeeCount
  project_shares: IProjectShare[]
  products: string[]
  permit_documents: IPermitDocument
  selected_manager: string
}

export interface IWorkPermitDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IWorkPermitInput {
  project: string
  start_date: Date
  end_date: Date
  previous_permit_number: String
  project_input: IProjectInput
  raw_materials: IRawMaterial[]
  project_cost: IProjectCost
  permanent_employee_count: IEmployeeCount
  temporary_employee_count: IEmployeeCount
  project_shares: IProjectShare[]
  products: string[]
  permit_documents: IPermitDocument
  selected_manager: string
}


export interface IWorkPermitEdit {
  _id: string
  project?: string
  start_date?: Date
  end_date?: Date
  previous_permit_number?: String
  project_input?: IProjectInput
  raw_materials?: IRawMaterial[]
  project_cost?: IProjectCost
  permanent_employee_count?: IEmployeeCount
  temporary_employee_count?: IEmployeeCount
  project_shares?: IProjectShare[]
  products?: string[]
  permit_documents?: IPermitDocument
  selected_manager?: string
}

export interface IPostWorkPermit {
  input: IWorkPermitInput
}

export interface IEditWorkPermit {
  input: IWorkPermitEdit
}

export enum ProjectStageTypes {
  PreImplementation = "Pre Implementation",
  Implementation = "Implementation",
  Operation = "Operation",
}

export enum Nationalities {
  Ethiopia = "Ethiopia",
  Kenya = "Kenya",
  Sudan = "Sudan",
}

export enum ProductUnitTypes {
  Kg = "Kg",
  Liter = "Liter",
  Meter = "Meter",
  Dull = "Meter",
  Pcs = "Pcs",
  Carton = "Carton",
  Pair = "Pair",
  Set = "Set",
  Drum = "Drum",
  M_Ton = "M.Ton",
  Galon = "Galon",
  Sheet = "Sheet",
  Pad = "Pad",
  Roll = "Roll",
  KMeter = "KMeter",
  Bages = "Bages",
  Jar = "Jar",
  Cylinder = "Cylinder",
  Number = "Number",
  Feresula = "Feresula",
  Hour = "Hour",
  Wat = "Wat",
  Other = "Other",
}
