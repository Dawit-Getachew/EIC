import { ManagerModel } from "../../Models/Manager/manager.schema"
import { IManagerResolver, IBasicID, IBasicIDs, IManager, IManagerDoc, IPostManager, IEditManager, GQLResponseTag } from "../../Models/Manager/manager.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(ManagerModel, GQLResponseTag).getAPICalls()

const resolver: IManagerResolver = {
  Query: {
    async fetchManagers(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IManagerDoc<IManager[]>
    },

    async fetchOneManagerByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IManagerDoc<IManager>
    },

    async fetchManyManagersByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IManagerDoc<IManager[]>
    }
  },

  Mutation: {
    async postManager(_: any, prop: IPostManager, __: any) {
      return await Create(prop.input) as unknown as IManagerDoc<IManager>
    },

    async editManager(_: any, prop: IEditManager, __: any) {
      return await Edit(prop.input) as unknown as IManagerDoc<IManager>
    },

    async removeOneManagerByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IManagerDoc<IManager>
    },

    async removeManyManagersByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IManagerDoc<IManager[]>
    },

    async removeAllManagers(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IManagerDoc<string>
    }
  }
}

export default resolver