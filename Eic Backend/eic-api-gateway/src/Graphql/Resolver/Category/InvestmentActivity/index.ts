import { IBasicID, IBasicIDs } from "../../../../Common/interface";
import { InvestmentActivityActions } from "../../../Schema/Category/InvestmentActivity/action";
import { CATEGORY_QUEUES } from "../../../../Common/queue_names"
import { InvestmentActivityRoutes } from "../../../../Common/routes"
import { RabbitMQProducer } from "../../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = InvestmentActivityActions

const InvestmentActivityResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: InvestmentActivityRoutes.GET_ALL_INVESTMENT_ACTIVITIES,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: InvestmentActivityRoutes.GET_ONE_INVESTMENT_ACTIVITY,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: InvestmentActivityRoutes.GET_MANY_INVESTMENT_ACTIVITIES_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: InvestmentActivityRoutes.POST_INVESTMENT_ACTIVITY,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: InvestmentActivityRoutes.EDIT_INVESTMENT_ACTIVITY,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: InvestmentActivityRoutes.REMOVE_MANY_INVESTMENT_ACTIVITIES_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: InvestmentActivityRoutes.REMOVE_INVESTMENT_ACTIVITY_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(CATEGORY_QUEUES.QUEUE_FOR_CATEGORY, {
        route: InvestmentActivityRoutes.REMOVE_ALL_INVESTMENT_ACTIVITIES,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default InvestmentActivityResolver