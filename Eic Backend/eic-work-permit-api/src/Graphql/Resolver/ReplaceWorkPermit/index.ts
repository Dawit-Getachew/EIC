import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { ReplaceWorkPermitActions } from "../../../Graphql/Schema/ReplaceWorkPermit/action";
import { REPLACE_WORK_PERMIT_QUEUES } from "../../../Common/queue_names"
import { ReplaceWorkPermitRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchMyReplacementWorkPermits },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = ReplaceWorkPermitActions

const ReplaceWorkPermitResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.GET_ALL_REPLACE_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.GET_ONE_REPLACE_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.GET_MANY_REPLACE_WORK_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchMyReplacementWorkPermits](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.GET_ALL_REPLACE_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      const payload = JSON.parse(response)
      if (payload) {
        if (payload.length > 0) {
          return payload.filter((item: any) => item.service_id === data._id)
        }
      }
      return []
    },
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.POST_REPLACE_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.EDIT_REPLACE_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.REMOVE_MANY_REPLACE_WORK_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.REMOVE_REPLACE_WORK_PERMIT_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(REPLACE_WORK_PERMIT_QUEUES.QUEUE_FOR_REPLACE_WORK_PERMIT, {
        route: ReplaceWorkPermitRoutes.REMOVE_ALL_REPLACE_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default ReplaceWorkPermitResolver