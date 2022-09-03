import { gql } from "apollo-server-express"
import { SectorActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = SectorActions

export default gql`
  extend type Query {
    ${fetchAll}: [ISector]
    ${fetchOneByID}(_id: ID!): ISector
    ${fetchManyByID}(_ids: [ID!]!): [ISector]
  }

  extend type Mutation {
    ${post}(input: ISectorInput): ISectorResponse
    ${edit}(input: ISectorEdit): ISectorResponse
    ${removeOne}(_id: ID!): ISector
    ${removeMany}(_ids: [ID!]!): [ISector]
    ${removeAll}: String
  }

  union ISectorResponse = ISectorSimple | SystemError | ValidationError | ValidationErrors

  type ISector {
    _id: ID
    name: String
    createdAt: Date
    updatedAt: Date
  }

  type ISectorSimple {
    _id: ID
    name: String
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input ISectorInput {
    name: String!
  }

  input ISectorEdit {
    _id: ID!
    name: String!
  }

`