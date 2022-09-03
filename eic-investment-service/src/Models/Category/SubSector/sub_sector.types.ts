import { Schema } from "mongoose"
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "../../../Common/interface";

export { IBasicID, IBasicIDs }

export const GQLResponseTag = "ISubSectorSimple"

export interface ISubSectorResolver {
  Query: ISubSectorQuery
  Mutation: ISubSectorMutation
}

export interface ISubSectorQuery {
  fetchSubSectors: (parent: any, args: any, context: any) => Promise<ISubSectorDoc<ISubSector[]>>
  fetchOneSubSectorByID: (parent: any, args: IBasicID, context: any) => Promise<ISubSectorDoc<ISubSector>>
  fetchManySubSectorsByID: (parent: any, args: IBasicIDs, context: any) => Promise<ISubSectorDoc<ISubSector[]>>
}

export interface ISubSectorMutation {
  postSubSector: (parent: any, args: IPostSubSector, context: any) => Promise<ISubSectorDoc<ISubSector>>
  editSubSector: (parent: any, args: IEditSubSector, context: any) => Promise<ISubSectorDoc<ISubSector>>
  removeOneSubSectorByID: (parent: any, args: IBasicID, context: any) => Promise<ISubSectorDoc<ISubSector>>
  removeManySubSectorsByID: (parent: any, args: IBasicIDs, context: any) => Promise<ISubSectorDoc<ISubSector[]>>
  removeAllSubSectors: (parent: any, args: any, context: any) => Promise<ISubSectorDoc<string>>
}

export interface ISubSector extends IBasicDoc {
  name: string
  sector: Schema.Types.ObjectId
}

export interface ISubSectorDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface ISubSectorInput {
  name: string
  sector: Schema.Types.ObjectId
}

export interface ISubSectorEdit {
  _id: string
  name: string
  sector?: Schema.Types.ObjectId
}

export interface IPostSubSector {
  input: ISubSectorInput
}

export interface IEditSubSector {
  input: ISubSectorEdit
}