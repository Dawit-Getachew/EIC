import { IRabbitMQServerMessage } from "../../Common/interface"
import { InvestmentPermitAmmendmentRoutes } from "../../Common/routes"
import InvestmentPermitAmmendmentResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostInvestmentPermitAmmendment, IEditInvestmentPermitAmmendment } from "../../Models/InvestmentPermitAmmendment/investment_permit_ammendment.types"

/**
 * This module involves the work of investment ammendment permit. It's mainly composed of
 * a controller object that routes the items in the queue
 * and reroutes it to its own service function
 * 
 * The investment ammendment permit service class serves as a wrapper object for the resolver.ts
 * it mainly encapsulates the CRUD operations that are performed in this schema
 * 
 */
export const InvestmentPermitAmmendmentController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case InvestmentPermitAmmendmentRoutes.GET_ALL_INVESTMENT_PERMIT_AMMENDMENTS: {
      return await InvestmentPermitAmmendmentService.fetchInvestmentPermitAmmendments()
    }

    case InvestmentPermitAmmendmentRoutes.GET_ONE_INVESTMENT_PERMIT_AMMENDMENT: {
      return await InvestmentPermitAmmendmentService.fetchOneInvestmentPermitAmmendmentByID(payload.data)
    }

    case InvestmentPermitAmmendmentRoutes.GET_MANY_INVESTMENT_PERMIT_AMMENDMENTS_BY_ID: {
      return await InvestmentPermitAmmendmentService.fetchManyInvestmentPermitAmmendmentsByID(payload.data)
    }

    case InvestmentPermitAmmendmentRoutes.POST_INVESTMENT_PERMIT_AMMENDMENT: {
      return await InvestmentPermitAmmendmentService.postInvestmentPermitAmmendment(payload.data)
    }

    case InvestmentPermitAmmendmentRoutes.EDIT_INVESTMENT_PERMIT_AMMENDMENT: {
      return await InvestmentPermitAmmendmentService.editInvestmentPermitAmmendment(payload.data)
    }

    case InvestmentPermitAmmendmentRoutes.REMOVE_INVESTMENT_PERMIT_AMMENDMENT_BY_ID: {
      return await InvestmentPermitAmmendmentService.removeOneInvestmentPermitAmmendmentByID(payload.data)
    }

    case InvestmentPermitAmmendmentRoutes.REMOVE_MANY_INVESTMENT_PERMIT_AMMENDMENTS_BY_ID: {
      return await InvestmentPermitAmmendmentService.removeManyInvestmentPermitAmmendmentsByID(payload.data)
    }

    case InvestmentPermitAmmendmentRoutes.REMOVE_ALL_INVESTMENT_PERMIT_AMMENDMENTS: {
      return await InvestmentPermitAmmendmentService.removeAllInvestmentPermitAmmendments()
    }

    default: return {}
  }
}

class InvestmentPermitAmmendmentService {
  static async fetchInvestmentPermitAmmendments() {
    return await (await InvestmentPermitAmmendmentResolver.Query.fetchInvestmentPermitAmmendments({}, {}, {})).data
  }

  static async fetchOneInvestmentPermitAmmendmentByID(prop: IBasicID) {
    return await (await InvestmentPermitAmmendmentResolver.Query.fetchOneInvestmentPermitAmmendmentByID({}, prop, {})).data
  }

  static async fetchManyInvestmentPermitAmmendmentsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitAmmendmentResolver.Query.fetchManyInvestmentPermitAmmendmentsByID({}, prop, {})).data
  }

  static async postInvestmentPermitAmmendment(prop: IPostInvestmentPermitAmmendment) {
    return await (await InvestmentPermitAmmendmentResolver.Mutation.postInvestmentPermitAmmendment({}, prop, {})).data
  }

  static async editInvestmentPermitAmmendment(prop: IEditInvestmentPermitAmmendment) {
    return await (await InvestmentPermitAmmendmentResolver.Mutation.editInvestmentPermitAmmendment({}, prop, {})).data
  }

  static async removeOneInvestmentPermitAmmendmentByID(prop: IBasicID) {
    return await (await InvestmentPermitAmmendmentResolver.Mutation.removeOneInvestmentPermitAmmendmentByID({}, prop, {})).data
  }

  static async removeManyInvestmentPermitAmmendmentsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitAmmendmentResolver.Mutation.removeManyInvestmentPermitAmmendmentsByID({}, prop, {})).data
  }

  static async removeAllInvestmentPermitAmmendments() {
    return await (await InvestmentPermitAmmendmentResolver.Mutation.removeAllInvestmentPermitAmmendments({}, {}, {})).data
  }
}