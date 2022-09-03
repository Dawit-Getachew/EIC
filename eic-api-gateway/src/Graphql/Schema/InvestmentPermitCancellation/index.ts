import { gql } from "apollo-server-express"
import { InvestmentPermitCancellationActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = InvestmentPermitCancellationActions

export default gql`
  extend type Query {
    ${fetchAll}: [IInvestmentPermitCancellation]
    ${fetchOneByID}(_id: ID!): IInvestmentPermitCancellation
    ${fetchManyByID}(_ids: [ID!]!): [IInvestmentPermitCancellation]
  }

  extend type Mutation {
    ${post}(input: IInvestmentPermitCancellationInput): IInvestmentPermitCancellationResponse
    ${edit}(input: IInvestmentPermitCancellationEdit): IInvestmentPermitCancellationResponse
    ${removeOne}(_id: ID!): IInvestmentPermitCancellation
    ${removeMany}(_ids: [ID!]!): [IInvestmentPermitCancellation]
    ${removeAll}: String
  }

  union IInvestmentPermitCancellationResponse = IInvestmentPermitCancellationSimple | SystemError | ValidationError | ValidationErrors

  type IInvestmentPermitCancellation {
    _id: ID
    investment_id: ID
    permit_status: InvestmentPermitStatus
    service_id: String
    project_status: [String]
    problems_encountered: String
    cancellation_document: String
    has_duty_free: Boolean
    duty_free_content: String
    createdAt: Date
    updatedAt: Date
  }

  type IInvestmentPermitCancellationSimple {
    _id: ID
    investment_id: ID
    permit_status: InvestmentPermitStatus
    service_id: String
    project_status: [String]
    problems_encountered: String
    cancellation_document: String
    has_duty_free: Boolean
    duty_free_content: String
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IInvestmentPermitCancellationInput {
    investment_id: ID!
    service_id: String!
    project_status: [String]!
    problems_encountered: String!
    cancellation_document: String!
    has_duty_free: Boolean!
    duty_free_content: String!
  }

  input IInvestmentPermitCancellationEdit {
    _id: ID!
    investment_id: ID
    permit_status: InvestmentPermitStatus
    service_id: String
    project_status: [String]
    problems_encountered: String
    cancellation_document: String
    has_duty_free: Boolean
    duty_free_content: String
  }

`