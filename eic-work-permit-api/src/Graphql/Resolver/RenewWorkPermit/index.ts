import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { RenewWorkPermitActions } from "../../../Graphql/Schema/RenewWorkPermit/action";
import { RENEW_WORK_PERMIT_QUEUES } from "../../../Common/queue_names"
import { RenewWorkPermitRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = RenewWorkPermitActions

const RenewWorkPermitResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, {
        route: RenewWorkPermitRoutes.GET_ALL_RENEW_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, {
        route: RenewWorkPermitRoutes.GET_ONE_RENEW_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, {
        route: RenewWorkPermitRoutes.GET_MANY_RENEW_WORK_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, {
        route: RenewWorkPermitRoutes.POST_RENEW_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, {
        route: RenewWorkPermitRoutes.EDIT_RENEW_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, {
        route: RenewWorkPermitRoutes.REMOVE_MANY_RENEW_WORK_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, {
        route: RenewWorkPermitRoutes.REMOVE_RENEW_WORK_PERMIT_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(RENEW_WORK_PERMIT_QUEUES.QUEUE_FOR_RENEW_WORK_PERMIT, {
        route: RenewWorkPermitRoutes.REMOVE_ALL_RENEW_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default RenewWorkPermitResolver