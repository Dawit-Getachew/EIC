import InvestmentPermitExpansionResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostInvestmentPermitExpansion, IEditInvestmentPermitExpansion } from "../../Models/InvestmentPermitExpansion/investment_permit_expansion.types"
import { InvestmentPermitExpansionRoutes } from "../../Common/routes"
import { IRabbitMQServerMessage } from "../../Common/interface"
/**
 * This module involves the work of investment expansion permit. It's mainly composed of
 * a controller object that routes the items in the queue
 * and reroutes it to its own service function
 * 
 * The investment expansion permit service class serves as a wrapper object for the resolver.ts
 * it mainly encapsulates the CRUD operations that are performed in this schema
 * 
 */
export const InvestmentPermitExpansionController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case InvestmentPermitExpansionRoutes.GET_ALL_INVESTMENT_PERMIT_EXPANSIONS: {
      return await InvestmentPermitExpansionService.fetchInvestmentPermitExpansions()
    }

    case InvestmentPermitExpansionRoutes.GET_ONE_INVESTMENT_PERMIT_EXPANSION: {
      return await InvestmentPermitExpansionService.fetchOneInvestmentPermitExpansionByID(payload.data)
    }

    case InvestmentPermitExpansionRoutes.GET_MANY_INVESTMENT_PERMIT_EXPANSIONS_BY_ID: {
      return await InvestmentPermitExpansionService.fetchManyInvestmentPermitExpansionsByID(payload.data)
    }

    case InvestmentPermitExpansionRoutes.POST_INVESTMENT_PERMIT_EXPANSION: {
      return await InvestmentPermitExpansionService.postInvestmentPermitExpansion(payload.data)
    }

    case InvestmentPermitExpansionRoutes.EDIT_INVESTMENT_PERMIT_EXPANSION: {
      return await InvestmentPermitExpansionService.editInvestmentPermitExpansion(payload.data)
    }

    case InvestmentPermitExpansionRoutes.REMOVE_INVESTMENT_PERMIT_EXPANSION_BY_ID: {
      return await InvestmentPermitExpansionService.removeOneInvestmentPermitExpansionByID(payload.data)
    }

    case InvestmentPermitExpansionRoutes.REMOVE_MANY_INVESTMENT_PERMIT_EXPANSIONS_BY_ID: {
      return await InvestmentPermitExpansionService.removeManyInvestmentPermitExpansionsByID(payload.data)
    }

    case InvestmentPermitExpansionRoutes.REMOVE_ALL_INVESTMENT_PERMIT_EXPANSIONS: {
      return await InvestmentPermitExpansionService.removeAllInvestmentPermitExpansions()
    }

    default: return {}
  }
}

export default class InvestmentPermitExpansionService {
  static async fetchInvestmentPermitExpansions() {
    return await (await InvestmentPermitExpansionResolver.Query.fetchInvestmentPermitExpansions({}, {}, {})).data
  }

  static async fetchOneInvestmentPermitExpansionByID(prop: IBasicID) {
    return await (await InvestmentPermitExpansionResolver.Query.fetchOneInvestmentPermitExpansionByID({}, prop, {})).data
  }

  static async fetchManyInvestmentPermitExpansionsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitExpansionResolver.Query.fetchManyInvestmentPermitExpansionsByID({}, prop, {})).data
  }

  static async postInvestmentPermitExpansion(prop: IPostInvestmentPermitExpansion) {
    return await (await InvestmentPermitExpansionResolver.Mutation.postInvestmentPermitExpansion({}, prop, {})).data
  }

  static async editInvestmentPermitExpansion(prop: IEditInvestmentPermitExpansion) {
    return await (await InvestmentPermitExpansionResolver.Mutation.editInvestmentPermitExpansion({}, prop, {})).data
  }

  static async removeOneInvestmentPermitExpansionByID(prop: IBasicID) {
    return await (await InvestmentPermitExpansionResolver.Mutation.removeOneInvestmentPermitExpansionByID({}, prop, {})).data
  }

  static async removeManyInvestmentPermitExpansionsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitExpansionResolver.Mutation.removeManyInvestmentPermitExpansionsByID({}, prop, {})).data
  }

  static async removeAllInvestmentPermitExpansions() {
    return await (await InvestmentPermitExpansionResolver.Mutation.removeAllInvestmentPermitExpansions({}, {}, {})).data
  }
}