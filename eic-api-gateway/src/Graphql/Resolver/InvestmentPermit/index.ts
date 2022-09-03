import { IBasicID, IBasicIDs } from "../../../Common/interface";
import { InvestmentPermitActions } from "../../../Graphql/Schema/InvestmentPermit/action";
import { INVESTMENT_PERMIT_QUEUES } from "../../../Common/queue_names"
import { InvestmentPermitRoutes } from "../../../Common/routes"
import { RabbitMQProducer } from "../../../Connections/RabbitMQ/rabbitmq_producer";
import { IRoleAccount } from "../../../Common/interface"

/**
 * This module involves the resolver of investment permit. It's mainly composed of
 * a resolver object that sends an amqp request to the investment servive along the 
 * investmenr permit queue
 * 
 * The investment permit resolver serves as a skeleton for the Investment permit schema
 * it is supposed to send payloads into the investment permit queues
 * 
 */

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchUnAssigned, fetchAssigned, fetchAdminWorks, fetchMyPermits },
  Mutation: { edit, post, removeOne, removeMany, removeAll, assignToAdmins }
} = InvestmentPermitActions

const InvestmentPermitResolver = {
  Query: {
    async [fetchAll]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.GET_ALL_INVESTMENT_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchUnAssigned]() {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.GET_ALL_INVESTMENT_PERMITS,
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
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.GET_ALL_INVESTMENT_PERMITS,
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
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.GET_ALL_INVESTMENT_PERMITS,
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
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.GET_ALL_INVESTMENT_PERMITS,
        data: {}
      }) as unknown as string;
      const payload = JSON.parse(response)
      if (payload) {
        if (payload.length > 0) {
          return payload.filter((item: any) => item.investor_id === data._id)
        }
      }
      return []
    },
    async [fetchOneByID](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.GET_ONE_INVESTMENT_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
    async [fetchManyByID](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.GET_MANY_INVESTMENT_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    }
  },
  Mutation: {
    async [post](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.POST_INVESTMENT_PERMIT,
        data
      }) as unknown as string;
      const payload = JSON.parse(response)
      console.log("pp", payload)
      return payload
    },

    async [edit](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.EDIT_INVESTMENT_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeMany](_: any, data: IBasicIDs) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.REMOVE_MANY_INVESTMENT_PERMITS_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeOne](_: any, data: IBasicID) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.REMOVE_INVESTMENT_PERMIT_BY_ID,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [removeAll](_: any, data: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.REMOVE_ALL_INVESTMENT_PERMITS,
        data: {}
      }) as unknown as string;
      return JSON.parse(response)
    },

    async [assignToAdmins](_: any, data: any, context: any) {
      const response = await RabbitMQProducer.sendRequestAndReceiveResponse(INVESTMENT_PERMIT_QUEUES.QUEUE_FOR_INVESTMENT_PERMIT, {
        route: InvestmentPermitRoutes.EDIT_INVESTMENT_PERMIT,
        data
      }) as unknown as string;
      return JSON.parse(response)
    },
  }
}

export default InvestmentPermitResolver