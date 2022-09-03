import { gql } from "apollo-server-express"
import { InvestmentPermitAmmendmentActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = InvestmentPermitAmmendmentActions

export default gql`
  extend type Query {
    ${fetchAll}: [IInvestmentPermitAmmendment]
    ${fetchOneByID}(_id: ID!): IInvestmentPermitAmmendment
    ${fetchManyByID}(_ids: [ID!]!): [IInvestmentPermitAmmendment]
  }
  extend type Mutation {
    ${post}(input: IInvestmentPermitAmmendmentInput): IInvestmentPermitAmmendmentResponse
    ${edit}(input: IInvestmentPermitAmmendmentEdit): IInvestmentPermitAmmendmentResponse
    ${removeOne}(_id: ID!): IInvestmentPermitAmmendment
    ${removeMany}(_ids: [ID!]!): [IInvestmentPermitAmmendment]
    ${removeAll}: String
  }
  union IInvestmentPermitAmmendmentResponse = IInvestmentPermitAmmendmentSimple | SystemError | ValidationError | ValidationErrors
  type IInvestmentPermitAmmendment {
    _id: ID
    investment_id: ID
    service_id: String
    permit_status: InvestmentPermitStatus
    company_name: String
    company_name_amharic: String
    trade_name: String
    trade_name_amharic: String
    investor_nationality: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [IShareHolder]
    manager_full_name: String
    manager_full_name_amharic: String
    investment_capital_usd: Float
    investment_capital_birr: Float
    createdAt: Date
    updatedAt: Date
  }
  type IInvestmentPermitAmmendmentSimple {
    _id: ID
    investment_id: ID
    service_id: String
    permit_status: InvestmentPermitStatus
    company_name: String
    company_name_amharic: String
    trade_name: String
    trade_name_amharic: String
    investor_nationality: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [IShareHolder]
    manager_full_name: String
    manager_full_name_amharic: String
    investment_capital_usd: Float
    investment_capital_birr: Float
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    
  input IInvestmentPermitAmmendmentInput {
    investment_id: ID!
    service_id: String!
    company_name: String!
    company_name_amharic: String!
    trade_name: String!
    trade_name_amharic: String!
    investor_nationality: String!
    type_of_business: String!
    type_of_ownership: String!
    shareholders: [InputShareHolder!]!
    manager_full_name: String!
    manager_full_name_amharic: String!
    investment_capital_usd: Float!
    investment_capital_birr: Float!
  }
  input IInvestmentPermitAmmendmentEdit {
    _id: ID!
    investment_id: ID
    service_id: String
    permit_status: InvestmentPermitStatus
    company_name: String
    company_name_amharic: String
    trade_name: String
    trade_name_amharic: String
    investor_nationality: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [InputShareHolder]
    manager_full_name: String
    manager_full_name_amharic: String
    investment_capital_usd: Float
    investment_capital_birr: Float
  }
`