import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "src/common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IInvestmentActivitySimple"

export interface IInvestmentActivityResolver {
  Query: IInvestmentActivityQuery
  Mutation: IInvestmentActivityMutation
}

export interface IInvestmentActivityQuery {
  fetchInvestmentActivities: (parent: any, args: any, context: any) => Promise<IInvestmentActivityDoc<IInvestmentActivity[]>>
  fetchOneInvestmentActivityByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentActivityDoc<IInvestmentActivity>>
  fetchManyInvestmentActivitiesByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentActivityDoc<IInvestmentActivity[]>>
}

export interface IInvestmentActivityMutation {
  postInvestmentActivity: (parent: any, args: IPostInvestmentActivity, context: any) => Promise<IInvestmentActivityDoc<IInvestmentActivity>>
  editInvestmentActivity: (parent: any, args: IEditInvestmentActivity, context: any) => Promise<IInvestmentActivityDoc<IInvestmentActivity>>
  removeOneInvestmentActivityByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentActivityDoc<IInvestmentActivity>>
  removeManyInvestmentActivitiesByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentActivityDoc<IInvestmentActivity[]>>
  removeAllInvestmentActivities: (parent: any, args: any, context: any) => Promise<IInvestmentActivityDoc<string>>
}

export interface IInvestmentActivity extends IBasicDoc {
  name: string
  activity: string
}

export interface IInvestmentActivityDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IInvestmentActivityInput {
  name: string
  activity: string
}

export interface IInvestmentActivityEdit {
  _id: string
  name: string
  activity?: string
}

export interface IPostInvestmentActivity {
  input: IInvestmentActivityInput
}

export interface IEditInvestmentActivity {
  input: IInvestmentActivityEdit
}