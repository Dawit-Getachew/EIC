import { gql } from "apollo-server-express"
import { MessageActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne },
  Subscription: { subscribeToMessages }
} = MessageActions

export default gql`
  extend type Query {
    ${fetchAll}: [IMessage]
    ${fetchOneByID}(_id: ID!): IMessage
    ${fetchManyByID}(_ids: [ID!]!): [IMessage]
  }

  extend type Mutation {
    ${post}(input: IMessageInput): IMessageResponse
    ${edit}(input: IMessageEdit): IMessageResponse
    ${removeOne}(_id: ID!): IMessage
    ${removeMany}(_ids: [ID!]!): [IMessage]
    ${removeAll}: String
  }

  extend type Subscription {
    ${subscribeToMessages}(_id: String!): IMessage
  }

  union IMessageResponse = IMessageSimple | SystemError | ValidationError | ValidationErrors

  type IMessage {
    _id: ID
    content: String
    from_user: ID
    to_user: ID
    sender_role: SenderRole
    chatID: String
    createdAt: Date
    updatedAt: Date
  }

  type IMessageSimple {
    _id: ID
    content: String
    from_user: ID
    to_user: ID
    sender_role: SenderRole
    chatID: String
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IMessageInput {
    content: String!
    from_user: ID!
    to_user: ID!
    sender_role: SenderRole!
  }

  input IMessageEdit {
    _id: ID!
    content: String
    from_user: ID
    to_user: ID
    sender_role: SenderRole
  }

  enum SenderRole {
    ADMIN,
    USER
  }

`