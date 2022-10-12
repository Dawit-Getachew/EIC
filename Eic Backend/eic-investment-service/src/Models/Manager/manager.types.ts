import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "../../Common/interface";

export { IBasicID, IBasicIDs }

export const GQLResponseTag = "IManagerSimple"

export interface IManagerResolver {
  Query: IManagerQuery
  Mutation: IManagerMutation
}

export interface IManagerQuery {
  fetchManagers: (parent: any, args: any, context: any) => Promise<IManagerDoc<IManager[]>>
  fetchOneManagerByID: (parent: any, args: IBasicID, context: any) => Promise<IManagerDoc<IManager>>
  fetchManyManagersByID: (parent: any, args: IBasicIDs, context: any) => Promise<IManagerDoc<IManager[]>>
}

export interface IManagerMutation {
  postManager: (parent: any, args: IPostManager, context: any) => Promise<IManagerDoc<IManager>>
  editManager: (parent: any, args: IEditManager, context: any) => Promise<IManagerDoc<IManager>>
  removeOneManagerByID: (parent: any, args: IBasicID, context: any) => Promise<IManagerDoc<IManager>>
  removeManyManagersByID: (parent: any, args: IBasicIDs, context: any) => Promise<IManagerDoc<IManager[]>>
  removeAllManagers: (parent: any, args: any, context: any) => Promise<IManagerDoc<string>>
}

export interface IManager extends IBasicDoc {
  first_name: string
  middle_name: string
  last_name: string
  address: IBusinessAddress
}

export interface IManagerDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IManagerInput {
  first_name: string
  middle_name: string
  last_name: string
  address: IBusinessAddress
}

export interface IManagerEdit {
  _id: string
  first_name?: string
  middle_name?: string
  last_name?: string
  address?: IBusinessAddress
}

export interface IPostManager {
  input: IManagerInput
}

export interface IEditManager {
  input: IManagerEdit
}