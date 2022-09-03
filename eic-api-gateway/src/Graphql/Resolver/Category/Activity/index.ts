import { IBasicID, IBasicIDs } from "../../../../Common/interface";
import { ActivityActions } from "../../../Schema/Category/Activity/action";
import { CATEGORY_QUEUES } from "../../../../Common/queue_names"
import { ActivityRoutes } from "../../../../Common/routes"
import { RabbitMQProducer } from "../../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = ActivityActions

const ActivityResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: ActivityRoutes.GET_ALL_ACTIVITIES,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: ActivityRoutes.GET_ONE_ACTIVITY,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: ActivityRoutes.GET_MANY_ACTIVITIES_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: ActivityRoutes.POST_ACTIVITY,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: ActivityRoutes.EDIT_ACTIVITY,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: ActivityRoutes.REMOVE_MANY_ACTIVITIES_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: ActivityRoutes.REMOVE_ACTIVITY_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: ActivityRoutes.REMOVE_ALL_ACTIVITIES,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default ActivityResolver