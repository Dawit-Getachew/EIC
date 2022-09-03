import { gql } from "apollo-server-express"
import { ManagerActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = ManagerActions

export default gql`
  extend type Query {
    ${fetchAll}: [IManager]
    ${fetchOneByID}(_id: ID!): IManager
    ${fetchManyByID}(_ids: [ID!]!): [IManager]
  }

  extend type Mutation {
    ${post}(input: IManagerInput): IManagerResponse
    ${edit}(input: IManagerEdit): IManagerResponse
    ${removeOne}(_id: ID!): IManager
    ${removeMany}(_ids: [ID!]!): [IManager]
    ${removeAll}: String
  }

  union IManagerResponse = IManagerSimple | SystemError | ValidationError | ValidationErrors

  type IManager {
    _id: ID
    first_name: String
    middle_name: String
    last_name: String
    address: IBusinessAddress
    createdAt: Date
    updatedAt: Date
  }

  type IManagerSimple {
    _id: ID
    first_name: String
    middle_name: String
    last_name: String
    address: IBusinessAddress
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IManagerInput {
    first_name: String!
    middle_name: String!
    last_name: String!
    address: InputBusinessAddress!
  }

  input IManagerEdit {
    _id: ID!
    first_name: String
    middle_name: String
    last_name: String
    address: InputBusinessAddress
  }

`