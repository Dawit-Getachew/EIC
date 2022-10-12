import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { NotificationActions } from "../../../Graphql/Schema/Notification/action";
import { NOTIFICATION_QUEUES } from "../../../Common/queue_names"
import { NotificationRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = NotificationActions

const NotificationResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, {
        route: NotificationRoutes.GET_ALL_NOTIFICATIONS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, {
        route: NotificationRoutes.GET_ONE_NOTIFICATION,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, {
        route: NotificationRoutes.GET_MANY_NOTIFICATIONS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, {
        route: NotificationRoutes.POST_NOTIFICATION,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, {
        route: NotificationRoutes.EDIT_NOTIFICATION,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, {
        route: NotificationRoutes.REMOVE_MANY_NOTIFICATIONS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, {
        route: NotificationRoutes.REMOVE_NOTIFICATION_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(NOTIFICATION_QUEUES.QUEUE_FOR_NOTIFICATION, {
        route: NotificationRoutes.REMOVE_ALL_NOTIFICATIONS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default NotificationResolver