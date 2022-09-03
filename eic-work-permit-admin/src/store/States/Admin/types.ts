import { IBasicDoc, IBasicDocument, IBasicID, IBasicIDs, IRoleAccount as Role } from "src/common/interface"

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
  postAccount: (parent: any, args: IPostAccount | IPostCompany, context: any) => Promise<IAccountDoc<IAccount>>
  editAccount: (parent: any, args: IEditAccount, context: any) => Promise<IAccountDoc<IAccount>>
  removeOneAccountByID: (parent: any, args: IBasicID, context: any) => Promise<IAccountDoc<IAccount>>
  removeManyAccountsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IAccountDoc<IAccount[]>>
  removeAllAccounts: (parent: any, args: any, context: any) => Promise<IAccountDoc<string>>
}

export interface IAccount extends IBasicDoc {
  first_name: string
  last_name: string
  address: IAddress
  email: string
  phone_number: string
  role: Role
  password: string
  service_id: string
  is_active: boolean
}

export interface IAccountDoc<IDataType> extends IBasicDocument<IDataType> { }

export interface IAccountInput {
  first_name: string
  last_name: string
  address: IAddress
  email: string
  phone_number: string
  role: Role
  password: string
  is_active: boolean
  gender: AccountGender
}

export interface ICompanyInput {
  name: string
  address: IAddress
  email: string
  phone_number: string
  role: Role
  password: string
  service_id: string
}

export interface IAddress {
  city: string
  sub_city: string
  country: string
}

export interface IAccountEdit {
  _id: string
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  role?: Role
}

export interface IAccountSignin {
  phone_number: string
  password: string
}

export interface IPostAccount {
  input: IAccountInput
}

export interface IPostCompany {
  input: ICompanyInput
}

export interface IEditAccount {
  input: IAccountEdit
}

export interface ISigninAccount {
  input: IAccountSignin
}

export enum AccountGender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}