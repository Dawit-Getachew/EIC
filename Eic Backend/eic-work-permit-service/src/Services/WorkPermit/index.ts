import { IRabbitMQServerMessage } from "../../Common/interface"
import { WorkPermitRoutes } from "../../Common/routes"
import WorkPermitResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostWorkPermit, IEditWorkPermit } from "../../Models/WorkPermit/work_permit.types"

export const WorkPermitController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case WorkPermitRoutes.GET_ALL_WORK_PERMITS: {
      return await WorkPermitService.fetchWorkPermits()
    }

    case WorkPermitRoutes.GET_ONE_WORK_PERMIT: {
      return await WorkPermitService.fetchOneWorkPermitByID(payload.data)
    }

    case WorkPermitRoutes.GET_MANY_WORK_PERMITS_BY_ID: {
      return await WorkPermitService.fetchManyWorkPermitsByID(payload.data)
    }

    case WorkPermitRoutes.POST_WORK_PERMIT: {
      return await WorkPermitService.postWorkPermit(payload.data)
    }

    case WorkPermitRoutes.EDIT_WORK_PERMIT: {
      return await WorkPermitService.editWorkPermit(payload.data)
    }

    case WorkPermitRoutes.REMOVE_WORK_PERMIT_BY_ID: {
      return await WorkPermitService.removeOneWorkPermitByID(payload.data)
    }

    case WorkPermitRoutes.REMOVE_MANY_WORK_PERMITS_BY_ID: {
      return await WorkPermitService.removeManyWorkPermitsByID(payload.data)
    }

    case WorkPermitRoutes.REMOVE_ALL_WORK_PERMITS: {
      return await WorkPermitService.removeAllWorkPermits()
    }

    default: return {}
  }
}

class WorkPermitService {
  static async fetchWorkPermits() {
    return await (await WorkPermitResolver.Query.fetchWorkPermits({}, {}, {})).data
  }

  static async fetchOneWorkPermitByID(prop: IBasicID) {
    return await (await WorkPermitResolver.Query.fetchOneWorkPermitByID({}, prop, {})).data
  }

  static async fetchManyWorkPermitsByID(prop: IBasicIDs) {
    return await (await WorkPermitResolver.Query.fetchManyWorkPermitsByID({}, prop, {})).data
  }

  static async postWorkPermit(prop: IPostWorkPermit) {
    return await (await WorkPermitResolver.Mutation.postWorkPermit({}, prop, {})).data
  }

  static async editWorkPermit(prop: IEditWorkPermit) {
    return await (await WorkPermitResolver.Mutation.editWorkPermit({}, prop, {})).data
  }

  static async removeOneWorkPermitByID(prop: IBasicID) {
    return await (await WorkPermitResolver.Mutation.removeOneWorkPermitByID({}, prop, {})).data
  }

  static async removeManyWorkPermitsByID(prop: IBasicIDs) {
    return await (await WorkPermitResolver.Mutation.removeManyWorkPermitsByID({}, prop, {})).data
  }

  static async removeAllWorkPermits() {
    return await (await WorkPermitResolver.Mutation.removeAllWorkPermits({}, {}, {})).data
  }
}