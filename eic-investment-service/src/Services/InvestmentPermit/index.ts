import InvestmentPermitResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostInvestmentPermit, IEditInvestmentPermit } from "../../Models/InvestmentPermit/investment_permit.types"
import { InvestmentPermitRoutes } from "../../Common/routes"
import { IRabbitMQServerMessage } from "../../Common/interface"

/**
 * This module involves the work of investment permit. It's mainly composed of
 * a controller object that routes the items in the queue
 * and reroutes it to its own service function
 * 
 * The investment permit service class serves as a wrapper object for the resolver.ts
 * it mainly encapsulates the CRUD operations that are performed in this schema
 * 
 */

export const InvestmentPermitController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case InvestmentPermitRoutes.GET_ALL_INVESTMENT_PERMITS: {
      return await InvestmentPermitService.fetchInvestmentPermits()
    }

    case InvestmentPermitRoutes.GET_ONE_INVESTMENT_PERMIT: {
      return await InvestmentPermitService.fetchOneInvestmentPermitByID(payload.data)
    }

    case InvestmentPermitRoutes.GET_MANY_INVESTMENT_PERMITS_BY_ID: {
      return await InvestmentPermitService.fetchManyInvestmentPermitsByID(payload.data)
    }

    case InvestmentPermitRoutes.POST_INVESTMENT_PERMIT: {
      return await InvestmentPermitService.postInvestmentPermit(payload.data)
    }

    case InvestmentPermitRoutes.EDIT_INVESTMENT_PERMIT: {
      return await InvestmentPermitService.editInvestmentPermit(payload.data)
    }

    case InvestmentPermitRoutes.REMOVE_INVESTMENT_PERMIT_BY_ID: {
      return await InvestmentPermitService.removeOneInvestmentPermitByID(payload.data)
    }

    case InvestmentPermitRoutes.REMOVE_MANY_INVESTMENT_PERMITS_BY_ID: {
      return await InvestmentPermitService.removeManyInvestmentPermitsByID(payload.data)
    }

    case InvestmentPermitRoutes.REMOVE_ALL_INVESTMENT_PERMITS: {
      return await InvestmentPermitService.removeAllInvestmentPermits()
    }

    default: return {}
  }
}

export default class InvestmentPermitService {
  static async fetchInvestmentPermits() {
    return await (await InvestmentPermitResolver.Query.fetchInvestmentPermits({}, {}, {})).data
  }

  static async fetchOneInvestmentPermitByID(prop: IBasicID) {
    return await (await InvestmentPermitResolver.Query.fetchOneInvestmentPermitByID({}, prop, {})).data
  }

  static async fetchManyInvestmentPermitsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitResolver.Query.fetchManyInvestmentPermitsByID({}, prop, {})).data
  }

  static async postInvestmentPermit(prop: IPostInvestmentPermit) {
    return await (await InvestmentPermitResolver.Mutation.postInvestmentPermit({}, prop, {})).data
  }

  static async editInvestmentPermit(prop: IEditInvestmentPermit) {
    return await (await InvestmentPermitResolver.Mutation.editInvestmentPermit({}, prop, {})).data
  }

  static async removeOneInvestmentPermitByID(prop: IBasicID) {
    return await (await InvestmentPermitResolver.Mutation.removeOneInvestmentPermitByID({}, prop, {})).data
  }

  static async removeManyInvestmentPermitsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitResolver.Mutation.removeManyInvestmentPermitsByID({}, prop, {})).data
  }

  static async removeAllInvestmentPermits() {
    return await (await InvestmentPermitResolver.Mutation.removeAllInvestmentPermits({}, {}, {})).data
  }
}