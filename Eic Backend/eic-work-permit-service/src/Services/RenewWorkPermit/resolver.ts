import { RenewWorkPermitModel } from "../../Models/RenewWorkPermit/renew_work_permit.schema"
import { IRenewWorkPermitResolver, IBasicID, IBasicIDs, IRenewWorkPermit, IRenewWorkPermitDoc, IPostRenewWorkPermit, IEditRenewWorkPermit, GQLResponseTag } from "../../Models/RenewWorkPermit/renew_work_permit.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(RenewWorkPermitModel, GQLResponseTag).getAPICalls()

const resolver: IRenewWorkPermitResolver = {
  Query: {
    async fetchRenewWorkPermits(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IRenewWorkPermitDoc<IRenewWorkPermit[]>
    },

    async fetchOneRenewWorkPermitByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IRenewWorkPermitDoc<IRenewWorkPermit>
    },

    async fetchManyRenewWorkPermitsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IRenewWorkPermitDoc<IRenewWorkPermit[]>
    }
  },

  Mutation: {
    async postRenewWorkPermit(_: any, prop: IPostRenewWorkPermit, __: any) {
      return await Create(prop.input) as unknown as IRenewWorkPermitDoc<IRenewWorkPermit>
    },

    async editRenewWorkPermit(_: any, prop: IEditRenewWorkPermit, __: any) {
      return await Edit(prop.input) as unknown as IRenewWorkPermitDoc<IRenewWorkPermit>
    },

    async removeOneRenewWorkPermitByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IRenewWorkPermitDoc<IRenewWorkPermit>
    },

    async removeManyRenewWorkPermitsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IRenewWorkPermitDoc<IRenewWorkPermit[]>
    },

    async removeAllRenewWorkPermits(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IRenewWorkPermitDoc<string>
    }
  }
}

export default resolver