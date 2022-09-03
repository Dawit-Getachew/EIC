import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "src/common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IMessageSimple"

export interface IMessageResolver {
  Query: IMessageQuery
  Mutation: IMessageMutation
}

export interface IMessageQuery {
  fetchMessages: (parent: any, args: any, context: any) => Promise<IMessageDoc<IMessage[]>>
  fetchOneMessageByID: (parent: any, args: IBasicID, context: any) => Promise<IMessageDoc<IMessage>>
  fetchManyMessagesByID: (parent: any, args: IBasicIDs, context: any) => Promise<IMessageDoc<IMessage[]>>
}

export interface IMessageMutation {
  postMessage: (parent: any, args: IPostMessage, context: any) => Promise<IMessageDoc<IMessage>>
  editMessage: (parent: any, args: IEditMessage, context: any) => Promise<IMessageDoc<IMessage>>
  removeOneMessageByID: (parent: any, args: IBasicID, context: any) => Promise<IMessageDoc<IMessage>>
  removeManyMessagesByID: (parent: any, args: IBasicIDs, context: any) => Promise<IMessageDoc<IMessage[]>>
  removeAllMessages: (parent: any, args: any, context: any) => Promise<IMessageDoc<string>>
}

export interface IMessage extends IBasicDoc {
  content: string
  from_user: string
  to_user: string
  sender_role: SenderRole
  chatID: string
}

export interface IMessageDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IMessageInput {
  content: string
  from_user: string
  to_user: string
  sender_role: SenderRole
}

export interface IMessageEdit {
  _id: string
  content: string
  from_user: string
  to_user: string
  sender_role: SenderRole
}

export interface IPostMessage {
  input: IMessageInput
}

export interface IEditMessage {
  input: IMessageEdit
}

export enum SenderRole {
  ADMIN = "ADMIN",
  USER = "USER"
}