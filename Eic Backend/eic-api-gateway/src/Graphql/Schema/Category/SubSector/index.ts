import { gql } from "apollo-server-express"
import { SubSectorActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = SubSectorActions

export default gql`
  extend type Query {
    ${fetchAll}: [ISubSector]
    ${fetchOneByID}(_id: ID!): ISubSector
    ${fetchManyByID}(_ids: [ID!]!): [ISubSector]
  }

  extend type Mutation {
    ${post}(input: ISubSectorInput): ISubSectorResponse
    ${edit}(input: ISubSectorEdit): ISubSectorResponse
    ${removeOne}(_id: ID!): ISubSector
    ${removeMany}(_ids: [ID!]!): [ISubSector]
    ${removeAll}: String
  }

  union ISubSectorResponse = ISubSectorSimple | SystemError | ValidationError | ValidationErrors

  type ISubSector {
    _id: ID
    name: String
    sector: ID
    createdAt: Date
    updatedAt: Date
  }

  type ISubSectorSimple {
    _id: ID
    name: String
    sector: ID
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input ISubSectorInput {
    name: String!
    sector: ID!
  }

  input ISubSectorEdit {
    _id: ID!
    name: String
    sector: ID
  }

`