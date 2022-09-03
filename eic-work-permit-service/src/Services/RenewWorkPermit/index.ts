import { IRabbitMQServerMessage } from "../../Common/interface"
import { RenewWorkPermitRoutes } from "../../Common/routes"
import RenewWorkPermitResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostRenewWorkPermit, IEditRenewWorkPermit } from "../../Models/RenewWorkPermit/renew_work_permit.types"

export const RenewWorkPermitController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case RenewWorkPermitRoutes.GET_ALL_RENEW_WORK_PERMITS: {
      return await RenewWorkPermitService.fetchRenewWorkPermits()
    }

    case RenewWorkPermitRoutes.GET_ONE_RENEW_WORK_PERMIT: {
      return await RenewWorkPermitService.fetchOneRenewWorkPermitByID(payload.data)
    }

    case RenewWorkPermitRoutes.GET_MANY_RENEW_WORK_PERMITS_BY_ID: {
      return await RenewWorkPermitService.fetchManyRenewWorkPermitsByID(payload.data)
    }

    case RenewWorkPermitRoutes.POST_RENEW_WORK_PERMIT: {
      return await RenewWorkPermitService.postRenewWorkPermit(payload.data)
    }

    case RenewWorkPermitRoutes.EDIT_RENEW_WORK_PERMIT: {
      return await RenewWorkPermitService.editRenewWorkPermit(payload.data)
    }

    case RenewWorkPermitRoutes.REMOVE_RENEW_WORK_PERMIT_BY_ID: {
      return await RenewWorkPermitService.removeOneRenewWorkPermitByID(payload.data)
    }

    case RenewWorkPermitRoutes.REMOVE_MANY_RENEW_WORK_PERMITS_BY_ID: {
      return await RenewWorkPermitService.removeManyRenewWorkPermitsByID(payload.data)
    }

    case RenewWorkPermitRoutes.REMOVE_ALL_RENEW_WORK_PERMITS: {
      return await RenewWorkPermitService.removeAllRenewWorkPermits()
    }

    default: return {}
  }
}

class RenewWorkPermitService {
  static async fetchRenewWorkPermits() {
    return await (await RenewWorkPermitResolver.Query.fetchRenewWorkPermits({}, {}, {})).data
  }

  static async fetchOneRenewWorkPermitByID(prop: IBasicID) {
    return await (await RenewWorkPermitResolver.Query.fetchOneRenewWorkPermitByID({}, prop, {})).data
  }

  static async fetchManyRenewWorkPermitsByID(prop: IBasicIDs) {
    return await (await RenewWorkPermitResolver.Query.fetchManyRenewWorkPermitsByID({}, prop, {})).data
  }

  static async postRenewWorkPermit(prop: IPostRenewWorkPermit) {
    return await (await RenewWorkPermitResolver.Mutation.postRenewWorkPermit({}, prop, {})).data
  }

  static async editRenewWorkPermit(prop: IEditRenewWorkPermit) {
    return await (await RenewWorkPermitResolver.Mutation.editRenewWorkPermit({}, prop, {})).data
  }

  static async removeOneRenewWorkPermitByID(prop: IBasicID) {
    return await (await RenewWorkPermitResolver.Mutation.removeOneRenewWorkPermitByID({}, prop, {})).data
  }

  static async removeManyRenewWorkPermitsByID(prop: IBasicIDs) {
    return await (await RenewWorkPermitResolver.Mutation.removeManyRenewWorkPermitsByID({}, prop, {})).data
  }

  static async removeAllRenewWorkPermits() {
    return await (await RenewWorkPermitResolver.Mutation.removeAllRenewWorkPermits({}, {}, {})).data
  }
}