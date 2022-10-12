import { IBasicID, IBasicIDs } from "../../../../Common/interface";
import { SectorActions } from "../../../Schema/Category/Sector/action";
import { CATEGORY_QUEUES } from "../../../../Common/queue_names"
import { SectorRoutes } from "../../../../Common/routes"
import { RabbitMQProducer } from "../../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = SectorActions

const SectorResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SectorRoutes.GET_ALL_SECTORS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SectorRoutes.GET_ONE_SECTOR,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SectorRoutes.GET_MANY_SECTORS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SectorRoutes.POST_SECTOR,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SectorRoutes.EDIT_SECTOR,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SectorRoutes.REMOVE_MANY_SECTORS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SectorRoutes.REMOVE_SECTOR_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: SectorRoutes.REMOVE_ALL_SECTORS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default SectorResolver