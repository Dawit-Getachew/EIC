import { gql } from "apollo-server-express"
import { InvestmentActivityActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = InvestmentActivityActions

export default gql`
  extend type Query {
    ${fetchAll}: [IInvestmentActivity]
    ${fetchOneByID}(_id: ID!): IInvestmentActivity
    ${fetchManyByID}(_ids: [ID!]!): [IInvestmentActivity]
  }

  extend type Mutation {
    ${post}(input: IInvestmentActivityInput): IInvestmentActivityResponse
    ${edit}(input: IInvestmentActivityEdit): IInvestmentActivityResponse
    ${removeOne}(_id: ID!): IInvestmentActivity
    ${removeMany}(_ids: [ID!]!): [IInvestmentActivity]
    ${removeAll}: String
  }

  union IInvestmentActivityResponse = IInvestmentActivitySimple | SystemError | ValidationError | ValidationErrors

  type IInvestmentActivity {
    _id: ID
    name: String
    activity: ID
    createdAt: Date
    updatedAt: Date
  }

  type IInvestmentActivitySimple {
    _id: ID
    name: String
    activity: ID
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IInvestmentActivityInput {
    name: String!
    activity: ID!
  }

  input IInvestmentActivityEdit {
    _id: ID!
    name: String
    activity: ID
  }

`