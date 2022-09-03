import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { InvestmentPermitExpansionActions } from "../../Schema/InvestmentPermitExpansion/action";
import { INVESTMENT_PERMIT_EXPANSION_QUEUES } from "../../../Common/queue_names"
import { InvestmentPermitExpansionRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";
/**
 * This module involves the resolver of investment permit expansion. It's mainly composed of
 * a resolver object that sends an amqp request to the investment service along the 
 * investmenr permit expansion queue
 * 
 * The investment permit expansion resolver serves as a skeleton for the Investment permit schema
 * it is supposed to send payloads into the investment permit expansion queues
 * 
 */
const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = InvestmentPermitExpansionActions

const InvestmentPermitExpansionResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, {
        route: InvestmentPermitExpansionRoutes.GET_ALL_INVESTMENT_PERMIT_EXPANSIONS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, {
        route: InvestmentPermitExpansionRoutes.GET_ONE_INVESTMENT_PERMIT_EXPANSION,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, {
        route: InvestmentPermitExpansionRoutes.GET_MANY_INVESTMENT_PERMIT_EXPANSIONS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, {
        route: InvestmentPermitExpansionRoutes.POST_INVESTMENT_PERMIT_EXPANSION,
        data
      }) as unknown as string;
      const payload = JSON.parse(response)
      console.log("pp", payload)
      return payload
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, {
        route: InvestmentPermitExpansionRoutes.EDIT_INVESTMENT_PERMIT_EXPANSION,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, {
        route: InvestmentPermitExpansionRoutes.REMOVE_MANY_INVESTMENT_PERMIT_EXPANSIONS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, {
        route: InvestmentPermitExpansionRoutes.REMOVE_INVESTMENT_PERMIT_EXPANSION_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_EXPANSION_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_EXPANSION, {
        route: InvestmentPermitExpansionRoutes.REMOVE_ALL_INVESTMENT_PERMIT_EXPANSIONS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default InvestmentPermitExpansionResolver