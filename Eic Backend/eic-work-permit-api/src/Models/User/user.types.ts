import { Role } from "../../Common/constants";
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "../../Common/interface";

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
  postUser: (parent: any, args: IPostUser | IPostCompany, context: any) => Promise<IUserDoc<IUser>>
  editUser: (parent: any, args: IEditUser, context: any) => Promise<IUserDoc<IUser>>
  removeOneUserByID: (parent: any, args: IBasicID, context: any) => Promise<IUserDoc<IUser>>
  removeManyUsersByID: (parent: any, args: IBasicIDs, context: any) => Promise<IUserDoc<IUser[]>>
  removeAllUsers: (parent: any, args: any, context: any) => Promise<IUserDoc<string>>
}

export interface IUser extends IBasicDoc {
  [x: string]: any;
  email: string
  phone_number: string
  business_profile: string
  service_id: string
}

export interface IUserDoc<IDataType> extends IBasicDocument<IDataType> { }

export interface IUserInput {
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

export interface IUserEdit {
  _id: string
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  phone_number_type?: string
  country?: string
  city?: string
  profile_picture?: string
  password?: string
}

export interface IUserSignin {
  phone_number: string
  password: string
}

export interface IPostUser {
  input: IUserInput
}

export interface IPostCompany {
  input: ICompanyInput
}

export interface IEditUser {
  input: IUserEdit
}

export interface ISigninUser {
  input: IUserSignin
}

export interface IChangePassword {
  input: IChangePasswordInput
}

export interface IChangeEmail {
  input: IChangeEmailInput
}

export interface IChangePhone {
  input: IChangePhoneInput
}

export interface IChangePasswordInput {
  password: string
  new_password: string
}

export interface IChangeEmailInput {
  email: string
  password: string
}

export interface IChangePhoneInput {
  password: string
  phone_number: string
  phone_number_type?: string
}