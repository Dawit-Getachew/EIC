import InvestmentPermitRenewalResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostInvestmentPermitRenewal, IEditInvestmentPermitRenewal } from "../../Models/InvestmentPermitRenewal/investment_permit_renewal.types"
import { InvestmentPermitRenewalRoutes } from "../../Common/routes"
import { IRabbitMQServerMessage } from "../../Common/interface"
/**
 * This module involves the work of investment renewal permit. It's mainly composed of
 * a controller object that routes the items in the queue
 * and reroutes it to its own service function
 * 
 * The investment renewal permit service class serves as a wrapper object for the resolver.ts
 * it mainly encapsulates the CRUD operations that are performed in this schema
 * 
 */
export const InvestmentPermitRenewalController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case InvestmentPermitRenewalRoutes.GET_ALL_INVESTMENT_PERMIT_RENEWALS: {
      return await InvestmentPermitRenewalService.fetchInvestmentPermitRenewals()
    }

    case InvestmentPermitRenewalRoutes.GET_ONE_INVESTMENT_PERMIT_RENEWAL: {
      return await InvestmentPermitRenewalService.fetchOneInvestmentPermitRenewalByID(payload.data)
    }

    case InvestmentPermitRenewalRoutes.GET_MANY_INVESTMENT_PERMIT_RENEWALS_BY_ID: {
      return await InvestmentPermitRenewalService.fetchManyInvestmentPermitRenewalsByID(payload.data)
    }

    case InvestmentPermitRenewalRoutes.POST_INVESTMENT_PERMIT_RENEWAL: {
      return await InvestmentPermitRenewalService.postInvestmentPermitRenewal(payload.data)
    }

    case InvestmentPermitRenewalRoutes.EDIT_INVESTMENT_PERMIT_RENEWAL: {
      return await InvestmentPermitRenewalService.editInvestmentPermitRenewal(payload.data)
    }

    case InvestmentPermitRenewalRoutes.REMOVE_INVESTMENT_PERMIT_RENEWAL_BY_ID: {
      return await InvestmentPermitRenewalService.removeOneInvestmentPermitRenewalByID(payload.data)
    }

    case InvestmentPermitRenewalRoutes.REMOVE_MANY_INVESTMENT_PERMIT_RENEWALS_BY_ID: {
      return await InvestmentPermitRenewalService.removeManyInvestmentPermitRenewalsByID(payload.data)
    }

    case InvestmentPermitRenewalRoutes.REMOVE_ALL_INVESTMENT_PERMIT_RENEWALS: {
      return await InvestmentPermitRenewalService.removeAllInvestmentPermitRenewals()
    }

    default: return {}
  }
}

export default class InvestmentPermitRenewalService {
  static async fetchInvestmentPermitRenewals() {
    return await (await InvestmentPermitRenewalResolver.Query.fetchInvestmentPermitRenewals({}, {}, {})).data
  }

  static async fetchOneInvestmentPermitRenewalByID(prop: IBasicID) {
    return await (await InvestmentPermitRenewalResolver.Query.fetchOneInvestmentPermitRenewalByID({}, prop, {})).data
  }

  static async fetchManyInvestmentPermitRenewalsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitRenewalResolver.Query.fetchManyInvestmentPermitRenewalsByID({}, prop, {})).data
  }

  static async postInvestmentPermitRenewal(prop: IPostInvestmentPermitRenewal) {
    return await (await InvestmentPermitRenewalResolver.Mutation.postInvestmentPermitRenewal({}, prop, {})).data
  }

  static async editInvestmentPermitRenewal(prop: IEditInvestmentPermitRenewal) {
    return await (await InvestmentPermitRenewalResolver.Mutation.editInvestmentPermitRenewal({}, prop, {})).data
  }

  static async removeOneInvestmentPermitRenewalByID(prop: IBasicID) {
    return await (await InvestmentPermitRenewalResolver.Mutation.removeOneInvestmentPermitRenewalByID({}, prop, {})).data
  }

  static async removeManyInvestmentPermitRenewalsByID(prop: IBasicIDs) {
    return await (await InvestmentPermitRenewalResolver.Mutation.removeManyInvestmentPermitRenewalsByID({}, prop, {})).data
  }

  static async removeAllInvestmentPermitRenewals() {
    return await (await InvestmentPermitRenewalResolver.Mutation.removeAllInvestmentPermitRenewals({}, {}, {})).data
  }
}