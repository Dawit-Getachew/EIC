import { InvestmentPermitStatus } from "../../Models/InvestmentPermit/investment_permit.types";
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "../../Common/interface";

export { IBasicID, IBasicIDs }

export const GQLResponseTag = "IInvestmentPermitCancellationSimple"

export interface IInvestmentPermitCancellationResolver {
  Query: IInvestmentPermitCancellationQuery
  Mutation: IInvestmentPermitCancellationMutation
}

export interface IInvestmentPermitCancellationQuery {
  fetchInvestmentPermitCancellations: (parent: any, args: any, context: any) => Promise<IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation[]>>
  fetchOneInvestmentPermitCancellationByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation>>
  fetchManyInvestmentPermitCancellationsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation[]>>
}

export interface IInvestmentPermitCancellationMutation {
  postInvestmentPermitCancellation: (parent: any, args: IPostInvestmentPermitCancellation, context: any) => Promise<IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation>>
  editInvestmentPermitCancellation: (parent: any, args: IEditInvestmentPermitCancellation, context: any) => Promise<IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation>>
  removeOneInvestmentPermitCancellationByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation>>
  removeManyInvestmentPermitCancellationsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation[]>>
  removeAllInvestmentPermitCancellations: (parent: any, args: any, context: any) => Promise<IInvestmentPermitCancellationDoc<string>>
}

export interface IInvestmentPermitCancellation extends IBasicDoc {
  investment_id: string
  permit_status: InvestmentPermitStatus
  project_status: string[]
  problems_encountered: string
  cancellation_document: string
  has_duty_free: boolean
  duty_free_content: string
  service_id: string
}

export interface IInvestmentPermitCancellationDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IInvestmentPermitCancellationInput {
  investment_id: string
  permit_status: InvestmentPermitStatus
  project_status: string[]
  problems_encountered: string
  cancellation_document: string
  has_duty_free: boolean
  duty_free_content: string
  service_id: string
}

export interface IInvestmentPermitCancellationEdit {
  _id: string
  investment_id: string
  permit_status: InvestmentPermitStatus
  project_status: string[]
  problems_encountered: string
  cancellation_document: string
  has_duty_free: boolean
  duty_free_content: string
  service_id: string
}

export interface IPostInvestmentPermitCancellation {
  input: IInvestmentPermitCancellationInput
}

export interface IEditInvestmentPermitCancellation {
  input: IInvestmentPermitCancellationEdit
}