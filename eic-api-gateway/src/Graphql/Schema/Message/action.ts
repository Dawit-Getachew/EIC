import { Role } from "../../../Common/constants"

export const MessageActions = {
  Query: {
    fetchAll: "fetchMessages", fetchOneByID: "fetchOneMessageByID", fetchManyByID: "fetchManyMessagesByID",
  },
  Mutation: {
    post: "createMessage", edit: "updateMessage",
    removeOne: "removeOneMessage", removeMany: "removeManyMessages", removeAll: "removeAllMessages"
  },
  Subscription: {
    subscribeToMessages: 'subscribeToMessages'
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(MessageActions.Query),
        ...Object.values(MessageActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(MessageActions.Query), MessageActions.Mutation.removeOne,
        MessageActions.Mutation.post, MessageActions.Mutation.edit, MessageActions.Mutation.removeMany,
        MessageActions.Subscription.subscribeToMessages
      ]

    case Role.USER:
      return [
        MessageActions.Query.fetchOneByID,
        MessageActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
