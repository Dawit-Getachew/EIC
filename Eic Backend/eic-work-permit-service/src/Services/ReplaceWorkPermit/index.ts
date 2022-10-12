import { IRabbitMQServerMessage } from "../../Common/interface"
import { ReplaceWorkPermitRoutes } from "../../Common/routes"
import ReplaceWorkPermitResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostReplaceWorkPermit, IEditReplaceWorkPermit } from "../../Models/ReplaceWorkPermit/replace_work_permit.types"

export const ReplaceWorkPermitController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case ReplaceWorkPermitRoutes.GET_ALL_REPLACE_WORK_PERMITS: {
      return await ReplaceWorkPermitService.fetchReplaceWorkPermits()
    }

    case ReplaceWorkPermitRoutes.GET_ONE_REPLACE_WORK_PERMIT: {
      return await ReplaceWorkPermitService.fetchOneReplaceWorkPermitByID(payload.data)
    }

    case ReplaceWorkPermitRoutes.GET_MANY_REPLACE_WORK_PERMITS_BY_ID: {
      return await ReplaceWorkPermitService.fetchManyReplaceWorkPermitsByID(payload.data)
    }

    case ReplaceWorkPermitRoutes.POST_REPLACE_WORK_PERMIT: {
      return await ReplaceWorkPermitService.postReplaceWorkPermit(payload.data)
    }

    case ReplaceWorkPermitRoutes.EDIT_REPLACE_WORK_PERMIT: {
      return await ReplaceWorkPermitService.editReplaceWorkPermit(payload.data)
    }

    case ReplaceWorkPermitRoutes.REMOVE_REPLACE_WORK_PERMIT_BY_ID: {
      return await ReplaceWorkPermitService.removeOneReplaceWorkPermitByID(payload.data)
    }

    case ReplaceWorkPermitRoutes.REMOVE_MANY_REPLACE_WORK_PERMITS_BY_ID: {
      return await ReplaceWorkPermitService.removeManyReplaceWorkPermitsByID(payload.data)
    }

    case ReplaceWorkPermitRoutes.REMOVE_ALL_REPLACE_WORK_PERMITS: {
      return await ReplaceWorkPermitService.removeAllReplaceWorkPermits()
    }

    default: return {}
  }
}

class ReplaceWorkPermitService {
  static async fetchReplaceWorkPermits() {
    return await (await ReplaceWorkPermitResolver.Query.fetchReplaceWorkPermits({}, {}, {})).data
  }

  static async fetchOneReplaceWorkPermitByID(prop: IBasicID) {
    return await (await ReplaceWorkPermitResolver.Query.fetchOneReplaceWorkPermitByID({}, prop, {})).data
  }

  static async fetchManyReplaceWorkPermitsByID(prop: IBasicIDs) {
    return await (await ReplaceWorkPermitResolver.Query.fetchManyReplaceWorkPermitsByID({}, prop, {})).data
  }

  static async postReplaceWorkPermit(prop: IPostReplaceWorkPermit) {
    return await (await ReplaceWorkPermitResolver.Mutation.postReplaceWorkPermit({}, prop, {})).data
  }

  static async editReplaceWorkPermit(prop: IEditReplaceWorkPermit) {
    return await (await ReplaceWorkPermitResolver.Mutation.editReplaceWorkPermit({}, prop, {})).data
  }

  static async removeOneReplaceWorkPermitByID(prop: IBasicID) {
    return await (await ReplaceWorkPermitResolver.Mutation.removeOneReplaceWorkPermitByID({}, prop, {})).data
  }

  static async removeManyReplaceWorkPermitsByID(prop: IBasicIDs) {
    return await (await ReplaceWorkPermitResolver.Mutation.removeManyReplaceWorkPermitsByID({}, prop, {})).data
  }

  static async removeAllReplaceWorkPermits() {
    return await (await ReplaceWorkPermitResolver.Mutation.removeAllReplaceWorkPermits({}, {}, {})).data
  }
}