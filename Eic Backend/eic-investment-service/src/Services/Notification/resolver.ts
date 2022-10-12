import { NotificationModel } from "../../Models/Notification/notification.schema"
import { INotificationResolver, IBasicID, IBasicIDs, INotification, INotificationDoc, IPostNotification, IEditNotification, GQLResponseTag } from "../../Models/Notification/notification.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(NotificationModel, GQLResponseTag).getAPICalls()

const resolver: INotificationResolver = {
  Query: {
    async fetchNotifications(_: any, __: any, ___: any) {
      return await Fetch() as unknown as INotificationDoc<INotification[]>
    },

    async fetchOneNotificationByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as INotificationDoc<INotification>
    },

    async fetchManyNotificationsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as INotificationDoc<INotification[]>
    }
  },

  Mutation: {
    async postNotification(_: any, prop: IPostNotification, __: any) {
      return await Create(prop.input) as unknown as INotificationDoc<INotification>
    },

    async editNotification(_: any, prop: IEditNotification, __: any) {
      return await Edit(prop.input) as unknown as INotificationDoc<INotification>
    },

    async removeOneNotificationByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as INotificationDoc<INotification>
    },

    async removeManyNotificationsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as INotificationDoc<INotification[]>
    },

    async removeAllNotifications(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as INotificationDoc<string>
    }
  }
}

export default resolver