import { IRabbitMQServerMessage } from "../../Common/interface"
import { NotificationRoutes } from "../../Common/routes"
import NotificationResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostNotification, IEditNotification } from "../../Models/Notification/notification.types"

export const NotificationController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case NotificationRoutes.GET_ALL_NOTIFICATIONS: {
      return await NotificationService.fetchNotifications()
    }

    case NotificationRoutes.GET_ONE_NOTIFICATION: {
      return await NotificationService.fetchOneNotificationByID(payload.data)
    }

    case NotificationRoutes.GET_MANY_NOTIFICATIONS_BY_ID: {
      return await NotificationService.fetchManyNotificationsByID(payload.data)
    }

    case NotificationRoutes.POST_NOTIFICATION: {
      return await NotificationService.postNotification(payload.data)
    }

    case NotificationRoutes.EDIT_NOTIFICATION: {
      return await NotificationService.editNotification(payload.data)
    }

    case NotificationRoutes.REMOVE_NOTIFICATION_BY_ID: {
      return await NotificationService.removeOneNotificationByID(payload.data)
    }

    case NotificationRoutes.REMOVE_MANY_NOTIFICATIONS_BY_ID: {
      return await NotificationService.removeManyNotificationsByID(payload.data)
    }

    case NotificationRoutes.REMOVE_ALL_NOTIFICATIONS: {
      return await NotificationService.removeAllNotifications()
    }

    default: return {}
  }
}

export default class NotificationService {
  static async fetchNotifications() {
    return await (await NotificationResolver.Query.fetchNotifications({}, {}, {})).data
  }

  static async fetchOneNotificationByID(prop: IBasicID) {
    return await (await NotificationResolver.Query.fetchOneNotificationByID({}, prop, {})).data
  }

  static async fetchManyNotificationsByID(prop: IBasicIDs) {
    return await (await NotificationResolver.Query.fetchManyNotificationsByID({}, prop, {})).data
  }

  static async postNotification(prop: IPostNotification) {
    return await (await NotificationResolver.Mutation.postNotification({}, prop, {})).data
  }

  static async editNotification(prop: IEditNotification) {
    return await (await NotificationResolver.Mutation.editNotification({}, prop, {})).data
  }

  static async removeOneNotificationByID(prop: IBasicID) {
    return await (await NotificationResolver.Mutation.removeOneNotificationByID({}, prop, {})).data
  }

  static async removeManyNotificationsByID(prop: IBasicIDs) {
    return await (await NotificationResolver.Mutation.removeManyNotificationsByID({}, prop, {})).data
  }

  static async removeAllNotifications() {
    return await (await NotificationResolver.Mutation.removeAllNotifications({}, {}, {})).data
  }
}