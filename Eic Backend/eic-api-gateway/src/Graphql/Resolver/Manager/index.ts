import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { ManagerActions } from "../../Schema/Manager/action";
import { MANAGER_QUEUES } from "../../../Common/queue_names"
import { ManagerRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = ManagerActions

const ManagerResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MANAGER_QUEUES.QUEUE_FOR_MANAGER, {
        route: ManagerRoutes.GET_ALL_MANAGERS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MANAGER_QUEUES.QUEUE_FOR_MANAGER, {
        route: ManagerRoutes.GET_ONE_MANAGER,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MANAGER_QUEUES.QUEUE_FOR_MANAGER, {
        route: ManagerRoutes.GET_MANY_MANAGERS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MANAGER_QUEUES.QUEUE_FOR_MANAGER, {
        route: ManagerRoutes.POST_MANAGER,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MANAGER_QUEUES.QUEUE_FOR_MANAGER, {
        route: ManagerRoutes.EDIT_MANAGER,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MANAGER_QUEUES.QUEUE_FOR_MANAGER, {
        route: ManagerRoutes.REMOVE_MANY_MANAGERS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MANAGER_QUEUES.QUEUE_FOR_MANAGER, {
        route: ManagerRoutes.REMOVE_MANAGER_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MANAGER_QUEUES.QUEUE_FOR_MANAGER, {
        route: ManagerRoutes.REMOVE_ALL_MANAGERS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default ManagerResolver