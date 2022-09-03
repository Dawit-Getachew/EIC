import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { DocumentNumberActions } from "../../../Graphql/Schema/DocumentNumber/action";
import { DOCUMENT_NUMBER_QUEUES } from "../../../Common/queue_names"
import { DocumentNumberRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = DocumentNumberActions

const DocumentNumberResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, {
        route: DocumentNumberRoutes.GET_ALL_DOCUMENT_NUMBERS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, {
        route: DocumentNumberRoutes.GET_ONE_DOCUMENT_NUMBER,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, {
        route: DocumentNumberRoutes.GET_MANY_DOCUMENT_NUMBERS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, {
        route: DocumentNumberRoutes.POST_DOCUMENT_NUMBER,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, {
        route: DocumentNumberRoutes.EDIT_DOCUMENT_NUMBER,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, {
        route: DocumentNumberRoutes.REMOVE_MANY_DOCUMENT_NUMBERS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, {
        route: DocumentNumberRoutes.REMOVE_DOCUMENT_NUMBER_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(DOCUMENT_NUMBER_QUEUES.QUEUE_FOR_DOCUMENT_NUMBER, {
        route: DocumentNumberRoutes.REMOVE_ALL_DOCUMENT_NUMBERS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default DocumentNumberResolver