import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { InvestmentPermitCancellationActions } from "../../Schema/InvestmentPermitCancellation/action";
import { INVESTMENT_PERMIT_CANCELLATION_QUEUES } from "../../../Common/queue_names"
import { InvestmentPermitCancellationRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";
/**
 * This module involves the resolver of investment permit cancellation. It's mainly composed of
 * a resolver object that sends an amqp request to the investment service along the 
 * investmenr permit cancellation queue
 * 
 * The investment permit cancellation resolver serves as a skeleton for the Investment permit schema
 * it is supposed to send payloads into the investment permit cancellation queues
 * 
 */

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = InvestmentPermitCancellationActions

const InvestmentPermitCancellationResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, {
        route: InvestmentPermitCancellationRoutes.GET_ALL_INVESTMENT_PERMIT_CANCELLATIONS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, {
        route: InvestmentPermitCancellationRoutes.GET_ONE_INVESTMENT_PERMIT_CANCELLATION,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, {
        route: InvestmentPermitCancellationRoutes.GET_MANY_INVESTMENT_PERMIT_CANCELLATIONS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, {
        route: InvestmentPermitCancellationRoutes.POST_INVESTMENT_PERMIT_CANCELLATION,
        data
      }) as unknown as string;
      const payload = JSON.parse(response)
      console.log("pp", payload)
      return payload
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, {
        route: InvestmentPermitCancellationRoutes.EDIT_INVESTMENT_PERMIT_CANCELLATION,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, {
        route: InvestmentPermitCancellationRoutes.REMOVE_MANY_INVESTMENT_PERMIT_CANCELLATIONS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, {
        route: InvestmentPermitCancellationRoutes.REMOVE_INVESTMENT_PERMIT_CANCELLATION_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_CANCELLATION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_CANCELLATION, {
        route: InvestmentPermitCancellationRoutes.REMOVE_ALL_INVESTMENT_PERMIT_CANCELLATIONS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default InvestmentPermitCancellationResolver