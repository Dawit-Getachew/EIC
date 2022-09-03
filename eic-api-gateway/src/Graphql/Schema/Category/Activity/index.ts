import { gql } from "apollo-server-express"
import { ActivityActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = ActivityActions

export default gql`
  extend type Query {
    ${fetchAll}: [IActivity]
    ${fetchOneByID}(_id: ID!): IActivity
    ${fetchManyByID}(_ids: [ID!]!): [IActivity]
  }

  extend type Mutation {
    ${post}(input: IActivityInput): IActivityResponse
    ${edit}(input: IActivityEdit): IActivityResponse
    ${removeOne}(_id: ID!): IActivity
    ${removeMany}(_ids: [ID!]!): [IActivity]
    ${removeAll}: String
  }

  union IActivityResponse = IActivitySimple | SystemError | ValidationError | ValidationErrors

  type IActivity {
    _id: ID
    name: String
    sub_sector: ID
    createdAt: Date
    updatedAt: Date
  }

  type IActivitySimple {
    _id: ID
    name: String
    sub_sector: ID
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IActivityInput {
    name: String!
    sub_sector: ID!
  }

  input IActivityEdit {
    _id: ID!
    name: String
    sub_sector: ID
  }

`