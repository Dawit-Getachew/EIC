import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "src/common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "ISectorSimple"

export interface ISectorResolver {
  Query: ISectorQuery
  Mutation: ISectorMutation
}

export interface ISectorQuery {
  fetchSectors: (parent: any, args: any, context: any) => Promise<ISectorDoc<ISector[]>>
  fetchOneSectorByID: (parent: any, args: IBasicID, context: any) => Promise<ISectorDoc<ISector>>
  fetchManySectorsByID: (parent: any, args: IBasicIDs, context: any) => Promise<ISectorDoc<ISector[]>>
}

export interface ISectorMutation {
  postSector: (parent: any, args: IPostSector, context: any) => Promise<ISectorDoc<ISector>>
  editSector: (parent: any, args: IEditSector, context: any) => Promise<ISectorDoc<ISector>>
  removeOneSectorByID: (parent: any, args: IBasicID, context: any) => Promise<ISectorDoc<ISector>>
  removeManySectorsByID: (parent: any, args: IBasicIDs, context: any) => Promise<ISectorDoc<ISector[]>>
  removeAllSectors: (parent: any, args: any, context: any) => Promise<ISectorDoc<string>>
}

export interface ISector extends IBasicDoc {
  name: string
}

export interface ISectorDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface ISectorInput {
  name: string
}

export interface ISectorEdit {
  _id: string
  name: string
}

export interface IPostSector {
  input: ISectorInput
}

export interface IEditSector {
  input: ISectorEdit
}