import { InvestmentPermitStatus } from "../../Models/InvestmentPermit/investment_permit.types";
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "../../Common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IInvestmentPermitAmmendmentSimple"

export interface IInvestmentPermitAmmendmentResolver {
  Query: IInvestmentPermitAmmendmentQuery
  Mutation: IInvestmentPermitAmmendmentMutation
}

export interface IInvestmentPermitAmmendmentQuery {
  fetchInvestmentPermitAmmendments: (parent: any, args: any, context: any) => Promise<IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment[]>>
  fetchOneInvestmentPermitAmmendmentByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment>>
  fetchManyInvestmentPermitAmmendmentsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment[]>>
}

export interface IInvestmentPermitAmmendmentMutation {
  postInvestmentPermitAmmendment: (parent: any, args: IPostInvestmentPermitAmmendment, context: any) => Promise<IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment>>
  editInvestmentPermitAmmendment: (parent: any, args: IEditInvestmentPermitAmmendment, context: any) => Promise<IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment>>
  removeOneInvestmentPermitAmmendmentByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment>>
  removeManyInvestmentPermitAmmendmentsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment[]>>
  removeAllInvestmentPermitAmmendments: (parent: any, args: any, context: any) => Promise<IInvestmentPermitAmmendmentDoc<string>>
}

export interface IInvestmentPermitAmmendment extends IBasicDoc {
  investment_id: string
  service_id: string
  permit_status: InvestmentPermitStatus
  company_name: string
  company_name_amharic: string
  trade_name: string
  trade_name_amharic: string
  investor_nationality: string
  type_of_business: string
  type_of_ownership: string
  shareholders: object[]
  manager_full_name: string
  manager_full_name_amharic: string
  investment_capital_usd: number
  investment_capital_birr: number
}

export interface IInvestmentPermitAmmendmentDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IInvestmentPermitAmmendmentInput {
  investment_id: string
  service_id: string
  permit_status: InvestmentPermitStatus
  company_name: string
  company_name_amharic: string
  trade_name: string
  trade_name_amharic: string
  investor_nationality: string
  type_of_business: string
  type_of_ownership: string
  shareholders: object[]
  manager_full_name: string
  manager_full_name_amharic: string
  investment_capital_usd: number
  investment_capital_birr: number
}

export interface IInvestmentPermitAmmendmentEdit {
  _id: string
  investment_id: string
  service_id: string
  permit_status: InvestmentPermitStatus
  company_name: string
  company_name_amharic: string
  trade_name: string
  trade_name_amharic: string
  investor_nationality: string
  type_of_business: string
  type_of_ownership: string
  shareholders: object[]
  manager_full_name: string
  manager_full_name_amharic: string
  investment_capital_usd: number
  investment_capital_birr: number
}

export interface IPostInvestmentPermitAmmendment {
  input: IInvestmentPermitAmmendmentInput
}

export interface IEditInvestmentPermitAmmendment {
  input: IInvestmentPermitAmmendmentEdit
}