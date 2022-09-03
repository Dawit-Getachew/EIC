import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { InvestmentPermitAmmendmentActions } from "../../Schema/InvestmentPermitAmmendment/action";
import { INVESTMENT_PERMIT_AMMENDMENT_QUEUES } from "../../../Common/queue_names"
import { InvestmentPermitAmmendmentRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

/**
 * This module involves the resolver of investment permit ammendment. It's mainly composed of
 * a resolver object that sends an amqp request to the investment service along the 
 * investmenr permit amendment queue
 * 
 * The investment permit amendment resolver serves as a skeleton for the Investment permit schema
 * it is supposed to send payloads into the investment permit amendment queues
 * 
 */
const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = InvestmentPermitAmmendmentActions

const InvestmentPermitAmmendmentResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, {
        route: InvestmentPermitAmmendmentRoutes.GET_ALL_INVESTMENT_PERMIT_AMMENDMENTS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, {
        route: InvestmentPermitAmmendmentRoutes.GET_ONE_INVESTMENT_PERMIT_AMMENDMENT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, {
        route: InvestmentPermitAmmendmentRoutes.GET_MANY_INVESTMENT_PERMIT_AMMENDMENTS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, {
        route: InvestmentPermitAmmendmentRoutes.POST_INVESTMENT_PERMIT_AMMENDMENT,
        data
      }) as unknown as string;
      const payload = JSON.parse(response)
      console.log("pp", payload)
      return payload
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, {
        route: InvestmentPermitAmmendmentRoutes.EDIT_INVESTMENT_PERMIT_AMMENDMENT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, {
        route: InvestmentPermitAmmendmentRoutes.REMOVE_MANY_INVESTMENT_PERMIT_AMMENDMENTS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, {
        route: InvestmentPermitAmmendmentRoutes.REMOVE_INVESTMENT_PERMIT_AMMENDMENT_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_AMMENDMENT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT_AMMENDMENT, {
        route: InvestmentPermitAmmendmentRoutes.REMOVE_ALL_INVESTMENT_PERMIT_AMMENDMENTS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default InvestmentPermitAmmendmentResolver