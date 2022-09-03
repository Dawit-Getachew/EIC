import { IBasicID, IBasicIDs } from "../../../../Common/interface";
import { SubSectorActions } from "../../../Schema/Category/SubSector/action";
import { CATEGORY_QUEUES } from "../../../../Common/queue_names"
import { SubSectorRoutes } from "../../../../Common/routes"
import { RabbitMQProducer } from "../../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = SubSectorActions

const SubSectorResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SubSectorRoutes.GET_ALL_SUB_SECTORS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SubSectorRoutes.GET_ONE_SUB_SECTOR,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SubSectorRoutes.GET_MANY_SUB_SECTORS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SubSectorRoutes.POST_SUB_SECTOR,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SubSectorRoutes.EDIT_SUB_SECTOR,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SubSectorRoutes.REMOVE_MANY_SUB_SECTORS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SubSectorRoutes.REMOVE_SUB_SECTOR_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SubSectorRoutes.REMOVE_ALL_SUB_SECTORS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default SubSectorResolver