import { IRabbitMQServerMessage } from "../../Common/interface"
import { CancelWorkPermitRoutes } from "../../Common/routes"
import CancelWorkPermitResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostCancelWorkPermit, IEditCancelWorkPermit } from "../../Models/CancelWorkPermit/cancel_work_permit.types"

export const CancelWorkPermitController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case CancelWorkPermitRoutes.GET_ALL_CANCEL_WORK_PERMITS: {
      return await CancelWorkPermitService.fetchCancelWorkPermits()
    }

    case CancelWorkPermitRoutes.GET_ONE_CANCEL_WORK_PERMIT: {
      return await CancelWorkPermitService.fetchOneCancelWorkPermitByID(payload.data)
    }

    case CancelWorkPermitRoutes.GET_MANY_CANCEL_WORK_PERMITS_BY_ID: {
      return await CancelWorkPermitService.fetchManyCancelWorkPermitsByID(payload.data)
    }

    case CancelWorkPermitRoutes.POST_CANCEL_WORK_PERMIT: {
      return await CancelWorkPermitService.postCancelWorkPermit(payload.data)
    }

    case CancelWorkPermitRoutes.EDIT_CANCEL_WORK_PERMIT: {
      return await CancelWorkPermitService.editCancelWorkPermit(payload.data)
    }

    case CancelWorkPermitRoutes.REMOVE_CANCEL_WORK_PERMIT_BY_ID: {
      return await CancelWorkPermitService.removeOneCancelWorkPermitByID(payload.data)
    }

    case CancelWorkPermitRoutes.REMOVE_MANY_CANCEL_WORK_PERMITS_BY_ID: {
      return await CancelWorkPermitService.removeManyCancelWorkPermitsByID(payload.data)
    }

    case CancelWorkPermitRoutes.REMOVE_ALL_CANCEL_WORK_PERMITS: {
      return await CancelWorkPermitService.removeAllCancelWorkPermits()
    }

    default: return {}
  }
}

class CancelWorkPermitService {
  static async fetchCancelWorkPermits() {
    return await (await CancelWorkPermitResolver.Query.fetchCancelWorkPermits({}, {}, {})).data
  }

  static async fetchOneCancelWorkPermitByID(prop: IBasicID) {
    return await (await CancelWorkPermitResolver.Query.fetchOneCancelWorkPermitByID({}, prop, {})).data
  }

  static async fetchManyCancelWorkPermitsByID(prop: IBasicIDs) {
    return await (await CancelWorkPermitResolver.Query.fetchManyCancelWorkPermitsByID({}, prop, {})).data
  }

  static async postCancelWorkPermit(prop: IPostCancelWorkPermit) {
    return await (await CancelWorkPermitResolver.Mutation.postCancelWorkPermit({}, prop, {})).data
  }

  static async editCancelWorkPermit(prop: IEditCancelWorkPermit) {
    return await (await CancelWorkPermitResolver.Mutation.editCancelWorkPermit({}, prop, {})).data
  }

  static async removeOneCancelWorkPermitByID(prop: IBasicID) {
    return await (await CancelWorkPermitResolver.Mutation.removeOneCancelWorkPermitByID({}, prop, {})).data
  }

  static async removeManyCancelWorkPermitsByID(prop: IBasicIDs) {
    return await (await CancelWorkPermitResolver.Mutation.removeManyCancelWorkPermitsByID({}, prop, {})).data
  }

  static async removeAllCancelWorkPermits() {
    return await (await CancelWorkPermitResolver.Mutation.removeAllCancelWorkPermits({}, {}, {})).data
  }
}