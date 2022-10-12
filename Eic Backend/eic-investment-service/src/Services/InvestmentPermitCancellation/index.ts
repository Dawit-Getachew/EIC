import InvestmentPermitCancellationResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostInvestmentPermitCancellation, IEditInvestmentPermitCancellation } from "../../Models/InvestmentPermitCancellation/investment_permit_cancellation.types"
import { InvestmentPermitCancellationRoutes } from "../../Common/routes"
import { IRabbitMQServerMessage } from "../../Common/interface"

/**
 * This module involves the work of investment cancellation permit. It's mainly composed of
 * a controller object that routes the items in the queue
 * and reroutes it to its own service function
 * 
 * The investment cancellation permit service class serves as a wrapper object for the resolver.ts
 * it mainly encapsulates the CRUD operations that are performed in this schema
 * 
 */
export const InvestmentPermitCancellationController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case InvestmentPermitCancellationRoutes.GET_ALL_INVESTMENT_PERMIT_CANCELLATIONS: {
      return await InvestmentPermitCancellationService.fetchInvestmentPermitCancellations()
    }

    case InvestmentPermitCancellationRoutes.GET_ONE_INVESTMENT_PERMIT_CANCELLATION: {
      return await InvestmentPermitCancellationService.fetchOneInvestmentPermitCancellationByID(payload.data)
    }

    case InvestmentPermitCancellationRoutes.GET_MANY_INVESTMENT_PERMIT_CANCELLATIONS_BY_ID: {
      return await InvestmentPermitCancellationService.fetchManyInvestmentPermitCancellationsByID(payload.data)
    }

    case InvestmentPermitCancellationRoutes.POST_INVESTMENT_PERMIT_CANCELLATION: {
      return await InvestmentPermitCancellationService.postInvestmentPermitCancellation(payload.data)
    }

    case InvestmentPermitCancellationRoutes.EDIT_INVESTMENT_PERMIT_CANCELLATION: {
      return await InvestmentPermitCancellationService.editInvestmentPermitCancellation(payload.data)
    }

    case InvestmentPermitCancellationRoutes.REMOVE_INVESTMENT_PERMIT_CANCELLATION_BY_ID: {
      return await InvestmentPermitCancellationService.removeOneInvestmentPermitCancellationByID(payload.data)
    }

    case InvestmentPermitCancellationRoutes.REMOVE_MANY_INVESTMENT_PERMIT_CANCELLATIONS_BY_ID: {
      return await InvestmentPermitCancellationService.removeManyInvestmentPermitCancellationsByID(payload.data)
    }

    case InvestmentPermitCancellationRoutes.REMOVE_ALL_INVESTMENT_PERMIT_CANCELLATIONS: {
      return await InvestmentPermitCancellationService.removeAllInvestmentPermitCancellations()
    }

    default: return {}
  }
}

export default class InvestmentPermitCancellationService {
  static async fetchInvestmentPermitCancellations() {
    return await (await InvestmentPermitCancellationResolver.Query.fetchInvestmentPermitCancellations({}, {}, {})).data
  }

  static async fetchOneInvestmentPermitCancellationByID(prop: IBasicID) {
    return await (await InvestmentPermitCancellationResolver.Query.fetchOneInvestmentPermitCancellationByID({}, prop, {})).data
  }

  static async fetchManyInvestmentPermitCancellationsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitCancellationResolver.Query.fetchManyInvestmentPermitCancellationsByID({}, prop, {})).data
  }

  static async postInvestmentPermitCancellation(prop: IPostInvestmentPermitCancellation) {
    return await (await InvestmentPermitCancellationResolver.Mutation.postInvestmentPermitCancellation({}, prop, {})).data
  }

  static async editInvestmentPermitCancellation(prop: IEditInvestmentPermitCancellation) {
    return await (await InvestmentPermitCancellationResolver.Mutation.editInvestmentPermitCancellation({}, prop, {})).data
  }

  static async removeOneInvestmentPermitCancellationByID(prop: IBasicID) {
    return await (await InvestmentPermitCancellationResolver.Mutation.removeOneInvestmentPermitCancellationByID({}, prop, {})).data
  }

  static async removeManyInvestmentPermitCancellationsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitCancellationResolver.Mutation.removeManyInvestmentPermitCancellationsByID({}, prop, {})).data
  }

  static async removeAllInvestmentPermitCancellations() {
    return await (await InvestmentPermitCancellationResolver.Mutation.removeAllInvestmentPermitCancellations({}, {}, {})).data
  }
}