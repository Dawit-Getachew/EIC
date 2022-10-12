import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { MessageActions } from "../../Schema/Message/action";
import { MESSAGE_QUEUES } from "../../../Common/queue_names"
import { MessageRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";
import { pubsub } from "../../../app";
import { withFilter } from "graphql-subscriptions";
import { constants } from "../../../Common/subscription_constants";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll },
  Subscription: { subscribeToMessages }
} = MessageActions

const MessageResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MESSAGE_QUEUES.QUEUE_FOR_MESSAGE, {
        route: MessageRoutes.GET_ALL_MESSAGES,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MESSAGE_QUEUES.QUEUE_FOR_MESSAGE, {
        route: MessageRoutes.GET_ONE_MESSAGE,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MESSAGE_QUEUES.QUEUE_FOR_MESSAGE, {
        route: MessageRoutes.GET_MANY_MESSAGES_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      let chatID = ""
      if (data.input.sender_role === "USER") {
        chatID = `${data.input.from_user}+${data.input.to_user}`
      } else {
        chatID = `${data.input.to_user}+${data.input.from_user}`
      }
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MESSAGE_QUEUES.QUEUE_FOR_MESSAGE, {
        route: MessageRoutes.POST_MESSAGE,
        data: { input: { chatID, ...data.input } }
      }) as unknown as string;
      const payload = JSON.parse(response)
      await pubsub.publish(constants.MESSAGE_UPDATED, { [subscribeToMessages]: payload })
      return payload
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MESSAGE_QUEUES.QUEUE_FOR_MESSAGE, {
        route: MessageRoutes.EDIT_MESSAGE,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MESSAGE_QUEUES.QUEUE_FOR_MESSAGE, {
        route: MessageRoutes.REMOVE_MANY_MESSAGES_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MESSAGE_QUEUES.QUEUE_FOR_MESSAGE, {
        route: MessageRoutes.REMOVE_MESSAGE_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(MESSAGE_QUEUES.QUEUE_FOR_MESSAGE, {
        route: MessageRoutes.REMOVE_ALL_MESSAGES,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  },
  Subscription: {
    [subscribeToMessages]: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(constants.MESSAGE_UPDATED),
        (payload: any, variables: IBasicID) => {
          return payload[subscribeToMessages].to_user === variables._id
        },
      ),
    }
  }
}

export default MessageResolver