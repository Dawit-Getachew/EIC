import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { CancelWorkPermitActions } from "../../../Graphql/Schema/CancelWorkPermit/action";
import { CANCEL_WORK_PERMIT_QUEUES } from "../../../Common/queue_names"
import { CancelWorkPermitRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchMyCancelmentWorkPermits },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = CancelWorkPermitActions

const CancelWorkPermitResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.GET_ALL_CANCEL_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.GET_ONE_CANCEL_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.GET_MANY_CANCEL_WORK_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchMyCancelmentWorkPermits](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.GET_ALL_CANCEL_WORK_PERMITS,
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
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.POST_CANCEL_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.EDIT_CANCEL_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.REMOVE_MANY_CANCEL_WORK_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.REMOVE_CANCEL_WORK_PERMIT_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CANCEL_WORK_PERMIT_QUEUES.QUEUE_FOR_CANCEL_WORK_PERMIT, {
        route: CancelWorkPermitRoutes.REMOVE_ALL_CANCEL_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default CancelWorkPermitResolver