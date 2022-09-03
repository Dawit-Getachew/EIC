import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "src/common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IUserSimple"

export interface IUserResolver {
  Query: IUserQuery
  Mutation: IUserMutation
}

export interface IUserQuery {
  fetchUsers: (parent: any, args: any, context: any) => Promise<IUserDoc<IUser[]>>
  fetchOneUserByID: (parent: any, args: IBasicID, context: any) => Promise<IUserDoc<IUser>>
  fetchManyUsersByID: (parent: any, args: IBasicIDs, context: any) => Promise<IUserDoc<IUser[]>>
}

export interface IUserMutation {
  postUser: (parent: any, args: IPostUser, context: any) => Promise<IUserDoc<IUser>>
  editUser: (parent: any, args: IEditUser, context: any) => Promise<IUserDoc<IUser>>
  removeOneUserByID: (parent: any, args: IBasicID, context: any) => Promise<IUserDoc<IUser>>
  removeManyUsersByID: (parent: any, args: IBasicIDs, context: any) => Promise<IUserDoc<IUser[]>>
  removeAllUsers: (parent: any, args: any, context: any) => Promise<IUserDoc<string>>
}

export interface IUser extends IBasicDoc {
  first_name: string
  middle_name: string
  last_name: string
  email: string
  gender: string
  role: string
  phone_number: string
  service_id: string
}

export interface IUserDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IUserInput {
  first_name: string
  middle_name: string
  last_name: string
  email: string
  gender: string
  role: string
  phone_number: string
  password: string
}

export interface IUserEdit {
  _id: string
  first_name: string
  middle_name: string
  last_name: string
  email: string
  gender: string
  role: string
  phone_number: string
}

export interface IPostUser {
  input: IUserInput
}

export interface IEditUser {
  input: IUserEdit
}