import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "src/common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IAccountSimple"

export interface IAccountResolver {
  Query: IAccountQuery
  Mutation: IAccountMutation
}

export interface IAccountQuery {
  fetchAccounts: (parent: any, args: any, context: any) => Promise<IAccountDoc<IAccount[]>>
  fetchOneAccountByID: (parent: any, args: IBasicID, context: any) => Promise<IAccountDoc<IAccount>>
  fetchManyAccountsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IAccountDoc<IAccount[]>>
}

export interface IAccountMutation {
  postAccount: (parent: any, args: IPostAccount, context: any) => Promise<IAccountDoc<IAccount>>
  editAccount: (parent: any, args: IEditAccount, context: any) => Promise<IAccountDoc<IAccount>>
  removeOneAccountByID: (parent: any, args: IBasicID, context: any) => Promise<IAccountDoc<IAccount>>
  removeManyAccountsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IAccountDoc<IAccount[]>>
  removeAllAccounts: (parent: any, args: any, context: any) => Promise<IAccountDoc<string>>
}

export interface IAccount extends IBasicDoc {
  first_name: string
  middle_name: string
  last_name: string
  email: string
  gender: string
  role: string
  service_id: string
  phone_number: string
}

export interface IAccountDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IAccountInput {
  first_name: string
  middle_name: string
  last_name: string
  email: string
  gender: string
  role: string
  service_id: string
  phone_number: string
}

export interface IAccountEdit {
  _id: string
  first_name: string
  middle_name: string
  last_name: string
  email: string
  gender: string
  role: string
  service_id: string
  phone_number: string
}

export interface IPostAccount {
  input: IAccountInput
}

export interface IEditAccount {
  input: IAccountEdit
}