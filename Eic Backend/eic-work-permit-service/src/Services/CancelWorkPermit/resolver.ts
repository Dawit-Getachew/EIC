import { CancelWorkPermitModel } from "../../Models/CancelWorkPermit/cancel_work_permit.schema"
import { ICancelWorkPermitResolver, IBasicID, IBasicIDs, ICancelWorkPermit, ICancelWorkPermitDoc, IPostCancelWorkPermit, IEditCancelWorkPermit, GQLResponseTag } from "../../Models/CancelWorkPermit/cancel_work_permit.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(CancelWorkPermitModel, GQLResponseTag).getAPICalls()

const resolver: ICancelWorkPermitResolver = {
  Query: {
    async fetchCancelWorkPermits(_: any, __: any, ___: any) {
      return await Fetch() as unknown as ICancelWorkPermitDoc<ICancelWorkPermit[]>
    },

    async fetchOneCancelWorkPermitByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as ICancelWorkPermitDoc<ICancelWorkPermit>
    },

    async fetchManyCancelWorkPermitsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as ICancelWorkPermitDoc<ICancelWorkPermit[]>
    }
  },

  Mutation: {
    async postCancelWorkPermit(_: any, prop: IPostCancelWorkPermit, __: any) {
      return await Create(prop.input) as unknown as ICancelWorkPermitDoc<ICancelWorkPermit>
    },

    async editCancelWorkPermit(_: any, prop: IEditCancelWorkPermit, __: any) {
      return await Edit(prop.input) as unknown as ICancelWorkPermitDoc<ICancelWorkPermit>
    },

    async removeOneCancelWorkPermitByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as ICancelWorkPermitDoc<ICancelWorkPermit>
    },

    async removeManyCancelWorkPermitsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as ICancelWorkPermitDoc<ICancelWorkPermit[]>
    },

    async removeAllCancelWorkPermits(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as ICancelWorkPermitDoc<string>
    }
  }
}

export default resolver