import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { WorkPermitActions } from "../../../Graphql/Schema/WorkPermit/action";
import { WORK_PERMIT_QUEUES } from "../../../Common/queue_names"
import { WorkPermitRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";
import { IRoleAccount } from "../../../Common/interface"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchUnAssigned, fetchAssigned, fetchAdminWorks, fetchMyPermits },
  Mutation: { edit, post, removeOne, removeMany, removeAll, assignToAdmins }
} = WorkPermitActions

const WorkPermitResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.GET_ALL_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchUnAssigned]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.GET_ALL_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      const payload = JSON.parse(response)
      if (payload) {
        if (payload.length > 0) {
          return payload.filter((item: any) => !Boolean(item.isAssigned))
        }
      }
      return []
    },
    async [fetchAssigned]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.GET_ALL_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      const payload = JSON.parse(response)
      if (payload) {
        if (payload.length > 0) {
          return payload.filter((item: any) => Boolean(item.isAssigned))
        }
      }
      return []
    },
    async [fetchAdminWorks](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.GET_ALL_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      const payload = JSON.parse(response)
      if (payload) {
        if (payload.length > 0) {
          const assignedWorks = payload.filter((item: any) => Boolean(item.isAssigned))
          switch (data.input.role) {
            case IRoleAccount.CASE_WORKER: {
              return assignedWorks.filter((item: any) => item.assignedTo['case_worker'] === data.input._id)
            }
            case IRoleAccount.TEAM_LEADER: {
              return assignedWorks.filter((item: any) => item.assignedTo['team_leader'] === data.input._id)
            }
            case IRoleAccount.DIRECTOR: {
              return assignedWorks.filter((item: any) => item.assignedTo['director'] === data.input._id)
            }
            default: {
              return []
            }
          }
        }
      }
      return []
    },
    async [fetchMyPermits](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.GET_ALL_WORK_PERMITS,
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
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.GET_ONE_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.GET_MANY_WORK_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.POST_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.EDIT_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.REMOVE_MANY_WORK_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.REMOVE_WORK_PERMIT_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.REMOVE_ALL_WORK_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [assignToAdmins](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(WORK_PERMIT_QUEUES.QUEUE_FOR_WORK_PERMIT, {
        route: WorkPermitRoutes.EDIT_WORK_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default WorkPermitResolver