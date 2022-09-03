import { ReplaceWorkPermitModel } from "../../Models/ReplaceWorkPermit/replace_work_permit.schema"
import { IReplaceWorkPermitResolver, IBasicID, IBasicIDs, IReplaceWorkPermit, IReplaceWorkPermitDoc, IPostReplaceWorkPermit, IEditReplaceWorkPermit, GQLResponseTag } from "../../Models/ReplaceWorkPermit/replace_work_permit.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(ReplaceWorkPermitModel, GQLResponseTag).getAPICalls()

const resolver: IReplaceWorkPermitResolver = {
  Query: {
    async fetchReplaceWorkPermits(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IReplaceWorkPermitDoc<IReplaceWorkPermit[]>
    },

    async fetchOneReplaceWorkPermitByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IReplaceWorkPermitDoc<IReplaceWorkPermit>
    },

    async fetchManyReplaceWorkPermitsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IReplaceWorkPermitDoc<IReplaceWorkPermit[]>
    }
  },

  Mutation: {
    async postReplaceWorkPermit(_: any, prop: IPostReplaceWorkPermit, __: any) {
      return await Create(prop.input) as unknown as IReplaceWorkPermitDoc<IReplaceWorkPermit>
    },

    async editReplaceWorkPermit(_: any, prop: IEditReplaceWorkPermit, __: any) {
      return await Edit(prop.input) as unknown as IReplaceWorkPermitDoc<IReplaceWorkPermit>
    },

    async removeOneReplaceWorkPermitByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IReplaceWorkPermitDoc<IReplaceWorkPermit>
    },

    async removeManyReplaceWorkPermitsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IReplaceWorkPermitDoc<IReplaceWorkPermit[]>
    },

    async removeAllReplaceWorkPermits(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IReplaceWorkPermitDoc<string>
    }
  }
}

export default resolver