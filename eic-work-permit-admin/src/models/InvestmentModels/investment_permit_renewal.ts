import { InvestmentPermitStatus } from "./investment_permit";
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "src/common/interface";

export const GQLResponseTag = "IInvestmentPermitRenewalSimple"

export interface IInvestmentPermitRenewalResolver {
  Query: IInvestmentPermitRenewalQuery
  Mutation: IInvestmentPermitRenewalMutation
}

export interface IInvestmentPermitRenewalQuery {
  fetchInvestmentPermitRenewals: (parent: any, args: any, context: any) => Promise<IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal[]>>
  fetchOneInvestmentPermitRenewalByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal>>
  fetchManyInvestmentPermitRenewalsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal[]>>
}

export interface IInvestmentPermitRenewalMutation {
  postInvestmentPermitRenewal: (parent: any, args: IPostInvestmentPermitRenewal, context: any) => Promise<IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal>>
  editInvestmentPermitRenewal: (parent: any, args: IEditInvestmentPermitRenewal, context: any) => Promise<IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal>>
  removeOneInvestmentPermitRenewalByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal>>
  removeManyInvestmentPermitRenewalsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal[]>>
  removeAllInvestmentPermitRenewals: (parent: any, args: any, context: any) => Promise<IInvestmentPermitRenewalDoc<string>>
}

export interface IInvestmentPermitRenewal extends IBasicDoc {
  investment_id: string
  project_status: string[]
  problems_encountered: string
  date_of_commencement: Date
  permit_status: InvestmentPermitStatus
  service_id: string
}

export interface IInvestmentPermitRenewalDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IInvestmentPermitRenewalInput {
  investment_id: string
  project_status: string[]
  problems_encountered: string
  date_of_commencement: Date
  permit_status: InvestmentPermitStatus
  service_id: string
}

export interface IInvestmentPermitRenewalEdit {
  _id: string
  investment_id: string
  project_status: string[]
  problems_encountered: string
  date_of_commencement: Date
  permit_status: InvestmentPermitStatus
  service_id: string
}

export interface IPostInvestmentPermitRenewal {
  input: IInvestmentPermitRenewalInput
}

export interface IEditInvestmentPermitRenewal {
  input: IInvestmentPermitRenewalEdit
}