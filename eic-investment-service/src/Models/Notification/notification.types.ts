import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "../../Common/interface";

export { IBasicID, IBasicIDs }

export const GQLResponseTag = "INotificationSimple"

export interface INotificationResolver {
  Query: INotificationQuery
  Mutation: INotificationMutation
}

export interface INotificationQuery {
  fetchNotifications: (parent: any, args: any, context: any) => Promise<INotificationDoc<INotification[]>>
  fetchOneNotificationByID: (parent: any, args: IBasicID, context: any) => Promise<INotificationDoc<INotification>>
  fetchManyNotificationsByID: (parent: any, args: IBasicIDs, context: any) => Promise<INotificationDoc<INotification[]>>
}

export interface INotificationMutation {
  postNotification: (parent: any, args: IPostNotification, context: any) => Promise<INotificationDoc<INotification>>
  editNotification: (parent: any, args: IEditNotification, context: any) => Promise<INotificationDoc<INotification>>
  removeOneNotificationByID: (parent: any, args: IBasicID, context: any) => Promise<INotificationDoc<INotification>>
  removeManyNotificationsByID: (parent: any, args: IBasicIDs, context: any) => Promise<INotificationDoc<INotification[]>>
  removeAllNotifications: (parent: any, args: any, context: any) => Promise<INotificationDoc<string>>
}

export interface INotification extends IBasicDoc {
  title: string
  description: string
  icon: string
  service_id: string
  is_read: boolean
}

export interface INotificationDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface INotificationInput {
  title: string
  description: string
  icon: string
  service_id: string
}

export interface INotificationEdit {
  _id: string
  title: string
  description: string
  icon: string
  service_id: string
  is_read: boolean
}

export interface IPostNotification {
  input: INotificationInput
}

export interface IEditNotification {
  input: INotificationEdit
}