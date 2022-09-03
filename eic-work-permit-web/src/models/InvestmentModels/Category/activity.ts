import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "src/common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IActivitySimple"

export interface IActivityResolver {
  Query: IActivityQuery
  Mutation: IActivityMutation
}

export interface IActivityQuery {
  fetchActivities: (parent: any, args: any, context: any) => Promise<IActivityDoc<IActivity[]>>
  fetchOneActivityByID: (parent: any, args: IBasicID, context: any) => Promise<IActivityDoc<IActivity>>
  fetchManyActivitiesByID: (parent: any, args: IBasicIDs, context: any) => Promise<IActivityDoc<IActivity[]>>
}

export interface IActivityMutation {
  postActivity: (parent: any, args: IPostActivity, context: any) => Promise<IActivityDoc<IActivity>>
  editActivity: (parent: any, args: IEditActivity, context: any) => Promise<IActivityDoc<IActivity>>
  removeOneActivityByID: (parent: any, args: IBasicID, context: any) => Promise<IActivityDoc<IActivity>>
  removeManyActivitiesByID: (parent: any, args: IBasicIDs, context: any) => Promise<IActivityDoc<IActivity[]>>
  removeAllActivities: (parent: any, args: any, context: any) => Promise<IActivityDoc<string>>
}

export interface IActivity extends IBasicDoc {
  name: string
  sub_sector: string
}

export interface IActivityDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IActivityInput {
  name: string
  sub_sector: string
}

export interface IActivityEdit {
  _id: string
  name: string
  sub_sector?: string
}

export interface IPostActivity {
  input: IActivityInput
}

export interface IEditActivity {
  input: IActivityEdit
}