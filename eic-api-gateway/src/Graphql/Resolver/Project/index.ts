import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { ProjectActions } from "../../Schema/Project/action";
import { PROJECT_QUEUES } from "../../../Common/queue_names"
import { ProjectRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeOne, removeMany, removeAll }
} = ProjectActions

const ProjectResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PROJECT_QUEUES.QUEUE_FOR_PROJECT, {
        route: ProjectRoutes.GET_ALL_PROJECTS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PROJECT_QUEUES.QUEUE_FOR_PROJECT, {
        route: ProjectRoutes.GET_ONE_PROJECT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PROJECT_QUEUES.QUEUE_FOR_PROJECT, {
        route: ProjectRoutes.GET_MANY_PROJECTS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PROJECT_QUEUES.QUEUE_FOR_PROJECT, {
        route: ProjectRoutes.POST_PROJECT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PROJECT_QUEUES.QUEUE_FOR_PROJECT, {
        route: ProjectRoutes.EDIT_PROJECT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PROJECT_QUEUES.QUEUE_FOR_PROJECT, {
        route: ProjectRoutes.REMOVE_MANY_PROJECTS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PROJECT_QUEUES.QUEUE_FOR_PROJECT, {
        route: ProjectRoutes.REMOVE_PROJECT_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(PROJECT_QUEUES.QUEUE_FOR_PROJECT, {
        route: ProjectRoutes.REMOVE_ALL_PROJECTS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default ProjectResolver