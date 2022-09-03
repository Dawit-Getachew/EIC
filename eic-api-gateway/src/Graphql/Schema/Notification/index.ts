import { gql } from "apollo-server-express"
import { NotificationActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = NotificationActions

export default gql`
  extend type Query {
    ${fetchAll}: [INotification]
    ${fetchOneByID}(_id: ID!): INotification
    ${fetchManyByID}(_ids: [ID!]!): [INotification]
  }

  extend type Mutation {
    ${post}(input: INotificationInput): INotificationResponse
    ${edit}(input: INotificationEdit): INotificationResponse
    ${removeOne}(_id: ID!): INotification
    ${removeMany}(_ids: [ID!]!): [INotification]
    ${removeAll}: String
  }

  union INotificationResponse = INotificationSimple | SystemError | ValidationError | ValidationErrors
  type INotification {
    _id: ID
    title: String
    description: String
    icon: NotificationIcon
    service_id: String
    is_read: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type INotificationSimple {
    _id: ID
    title: String
    description: String
    icon: NotificationIcon
    service_id: String
    is_read: Boolean
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input INotificationInput {
    title: String!
    description: String!
    icon: NotificationIcon!
    service_id: String!
  }

  input INotificationEdit {
    _id: ID!
    title: String
    description: String
    icon: NotificationIcon
    service_id: String
    is_read: Boolean
  }

  enum NotificationIcon {
    SUCCESS, WARNING, ERROR, INFO
  }

`