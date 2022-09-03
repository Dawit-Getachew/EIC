import { Role } from "../../../Common/constants"

export const NotificationActions = {
  Query: {
    fetchAll: "fetchNotifications", fetchOneByID: "fetchOneNotificationByID", fetchManyByID: "fetchManyNotificationsByID",
  },
  Mutation: {
    post: "createNotification", edit: "updateNotification",
    removeOne: "removeOneNotification", removeMany: "removeManyNotifications", removeAll: "removeAllNotifications"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(NotificationActions.Query),
        ...Object.values(NotificationActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(NotificationActions.Query), NotificationActions.Mutation.removeOne,
        NotificationActions.Mutation.post, NotificationActions.Mutation.edit, NotificationActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        NotificationActions.Query.fetchOneByID,
        NotificationActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
