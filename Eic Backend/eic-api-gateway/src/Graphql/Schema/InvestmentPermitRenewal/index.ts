import { gql } from "apollo-server-express"
import { InvestmentPermitRenewalActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = InvestmentPermitRenewalActions

export default gql`
  extend type Query {
    ${fetchAll}: [IInvestmentPermitRenewal]
    ${fetchOneByID}(_id: ID!): IInvestmentPermitRenewal
    ${fetchManyByID}(_ids: [ID!]!): [IInvestmentPermitRenewal]
  }

  extend type Mutation {
    ${post}(input: IInvestmentPermitRenewalInput): IInvestmentPermitRenewalResponse
    ${edit}(input: IInvestmentPermitRenewalEdit): IInvestmentPermitRenewalResponse
    ${removeOne}(_id: ID!): IInvestmentPermitRenewal
    ${removeMany}(_ids: [ID!]!): [IInvestmentPermitRenewal]
    ${removeAll}: String
  }

  union IInvestmentPermitRenewalResponse = IInvestmentPermitRenewalSimple | SystemError | ValidationError | ValidationErrors

  type IInvestmentPermitRenewal {
    _id: ID
    investment_id: ID
    project_status: [String]
    problems_encountered: String
    date_of_commencement: Date
    permit_status: InvestmentPermitStatus
    service_id: String
    createdAt: Date
    updatedAt: Date
  }

  type IInvestmentPermitRenewalSimple {
    _id: ID
    investment_id: ID
    project_status: [String]
    problems_encountered: String
    date_of_commencement: Date
    permit_status: InvestmentPermitStatus
    service_id: String
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IInvestmentPermitRenewalInput {
    investment_id: ID!
    project_status: [String]!
    problems_encountered: String!
    date_of_commencement: Date!
    service_id: String!
  }

  input IInvestmentPermitRenewalEdit {
    _id: ID!
    investment_id: ID
    project_status: [String]
    problems_encountered: String
    date_of_commencement: Date
    permit_status: InvestmentPermitStatus
    service_id: String
  }

`