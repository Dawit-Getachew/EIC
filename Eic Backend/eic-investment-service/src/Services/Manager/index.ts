import { IRabbitMQServerMessage } from "../../Common/interface"
import { ManagerRoutes } from "../../Common/routes"
import ManagerResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostManager, IEditManager } from "../../Models/Manager/manager.types"

export const ManagerController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case ManagerRoutes.GET_ALL_MANAGERS: {
      return await ManagerService.fetchManagers()
    }

    case ManagerRoutes.GET_ONE_MANAGER: {
      return await ManagerService.fetchOneManagerByID(payload.data)
    }

    case ManagerRoutes.GET_MANY_MANAGERS_BY_ID: {
      return await ManagerService.fetchManyManagersByID(payload.data)
    }

    case ManagerRoutes.POST_MANAGER: {
      return await ManagerService.postManager(payload.data)
    }

    case ManagerRoutes.EDIT_MANAGER: {
      return await ManagerService.editManager(payload.data)
    }

    case ManagerRoutes.REMOVE_MANAGER_BY_ID: {
      return await ManagerService.removeOneManagerByID(payload.data)
    }

    case ManagerRoutes.REMOVE_MANY_MANAGERS_BY_ID: {
      return await ManagerService.removeManyManagersByID(payload.data)
    }

    case ManagerRoutes.REMOVE_ALL_MANAGERS: {
      return await ManagerService.removeAllManagers()
    }

    default: return {}
  }
}

export class ManagerService {
  static async fetchManagers() {
    return await (await ManagerResolver.Query.fetchManagers({}, {}, {})).data
  }

  static async fetchOneManagerByID(prop: IBasicID) {
    return await (await ManagerResolver.Query.fetchOneManagerByID({}, prop, {})).data
  }

  static async fetchManyManagersByID(prop: IBasicIDs) {
    return await (await ManagerResolver.Query.fetchManyManagersByID({}, prop, {})).data
  }

  static async postManager(prop: IPostManager) {
    return await (await ManagerResolver.Mutation.postManager({}, prop, {})).data
  }

  static async editManager(prop: IEditManager) {
    return await (await ManagerResolver.Mutation.editManager({}, prop, {})).data
  }

  static async removeOneManagerByID(prop: IBasicID) {
    return await (await ManagerResolver.Mutation.removeOneManagerByID({}, prop, {})).data
  }

  static async removeManyManagersByID(prop: IBasicIDs) {
    return await (await ManagerResolver.Mutation.removeManyManagersByID({}, prop, {})).data
  }

  static async removeAllManagers() {
    return await (await ManagerResolver.Mutation.removeAllManagers({}, {}, {})).data
  }
}