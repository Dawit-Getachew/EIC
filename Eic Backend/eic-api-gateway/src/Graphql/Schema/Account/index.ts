import { gql } from "apollo-server-express"
import { AccountActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchUserInfoBySession },
  Mutation: { edit, login, logout, post, removeAll, removeMany, removeOne, postAccount }
} = AccountActions

export default gql`
  extend type Query {
    ${fetchAll}: [IAccount]
    ${fetchOneByID}(_id: ID!): IAccount
    ${fetchUserInfoBySession}: IAccount
    ${fetchManyByID}(_ids: [ID!]!): [IAccount]
  }

  extend type Mutation {
    ${post}(input: IAccountInput): IAccountResponse
    ${postAccount}(input: IAccountInput): IAccountResponse
    ${edit}(input: IAccountEdit): IAccountResponse
    ${removeOne}(_id: ID!): IAccount
    ${removeMany}(_ids: [ID!]!): [IAccount]
    ${removeAll}: String
    ${login}(input: IAccountSignin): IAccountResponse
    ${logout}: ISignOutResponse
  }

  union IAccountResponse = IAccountSimple | SystemError | ValidationError | ValidationErrors | Message | UnAuthenticatedError | IAccount
  union ISignOutResponse = Message | UnAuthenticatedError

  type IAccount {
    _id: ID
    first_name: String
    middle_name: String
    last_name: String
    email: String
    gender: Gender
    role: String
    phone_number: String
    business_profile: String
    service_id: String
    createdAt: Date
    updatedAt: Date
  }

  type IAccountSimple {
    _id: ID
    first_name: String
    middle_name: String
    last_name: String
    email: String
    gender: Gender
    role: String
    phone_number: String
    business_profile: String
    service_id: String
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IAccountInput {
    first_name: String!
    middle_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    role: IRoleAccount!
    phone_number: String!
    password: String!
  }

  input IAccountEdit {
    _id: ID!
    first_name: String
    last_name: String
    email: String
    phone_number: String
    service_id: ID
    role: IRoleAccount
  }

  input IAccountSignin {
    phone_number: String!
    password: String!
  }

`