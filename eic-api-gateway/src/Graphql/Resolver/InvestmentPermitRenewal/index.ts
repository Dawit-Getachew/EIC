import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { InvestmentPermitRenewalActions } from "../../Schema/InvestmentPermitRenewal/action";
import { INVESTMENT_PERMIT_RENEWAL_QUEUES } from "../../../Common/queue_names"
import { InvestmentPermitRenewalRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";
/**
 * This module involves the resolver of investment permit renewal. It's mainly composed of
 * a resolver object that sends an amqp request to the investment service along the 
 * investmenr permit renewal queue
 * 
 * The investment permit renewal resolver serves as a skeleton for the Investment permit schema
 * it is supposed to send payloads into the investment permit renewal queues
 * 
 */
const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = InvestmentPermitRenewalActions

const InvestmentPermitRenewalResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, {
        route: InvestmentPermitRenewalRoutes.GET_ALL_INVESTMENT_PERMIT_RENEWALS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, {
        route: InvestmentPermitRenewalRoutes.GET_ONE_INVESTMENT_PERMIT_RENEWAL,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, {
        route: InvestmentPermitRenewalRoutes.GET_MANY_INVESTMENT_PERMIT_RENEWALS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, {
        route: InvestmentPermitRenewalRoutes.POST_INVESTMENT_PERMIT_RENEWAL,
        data
      }) as unknown as string;
      const payload = JSON.parse(response)
      console.log("pp", payload)
      return payload
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, {
        route: InvestmentPermitRenewalRoutes.EDIT_INVESTMENT_PERMIT_RENEWAL,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, {
        route: InvestmentPermitRenewalRoutes.REMOVE_MANY_INVESTMENT_PERMIT_RENEWALS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, {
        route: InvestmentPermitRenewalRoutes.REMOVE_INVESTMENT_PERMIT_RENEWAL_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_RENEWAL_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_RENEWAL, {
        route: InvestmentPermitRenewalRoutes.REMOVE_ALL_INVESTMENT_PERMIT_RENEWALS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default InvestmentPermitRenewalResolver