import { WorkPermitModel } from "../../Models/WorkPermit/work_permit.schema"
import { IWorkPermitResolver, IBasicID, IBasicIDs, IWorkPermit, IWorkPermitDoc, IPostWorkPermit, IEditWorkPermit, GQLResponseTag } from "../../Models/WorkPermit/work_permit.types"
import DBWrapper from "../../wrappers/APIGenerator"
import DocumentNumber from "../DocumentNumber/resolver"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(WorkPermitModel, GQLResponseTag).getAPICalls()

const resolver: IWorkPermitResolver = {
  Query: {
    async fetchWorkPermits(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IWorkPermitDoc<IWorkPermit[]>
    },

    async fetchOneWorkPermitByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IWorkPermitDoc<IWorkPermit>
    },

    async fetchManyWorkPermitsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IWorkPermitDoc<IWorkPermit[]>
    }
  },

  Mutation: {
    async postWorkPermit(_: any, prop: IPostWorkPermit, __: any) {
      const docNumber = await DocumentNumber.Mutation.postDocumentNumber({}, {
        input: {
          ref_number: `WP-FOR-${prop.input.service_id}`
        }
      }, {})
      return await Create({ ...prop.input, document_number: docNumber.data.document_number }) as unknown as IWorkPermitDoc<IWorkPermit>
    },

    async editWorkPermit(_: any, prop: IEditWorkPermit, __: any) {
      return await Edit(prop.input) as unknown as IWorkPermitDoc<IWorkPermit>
    },

    async removeOneWorkPermitByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IWorkPermitDoc<IWorkPermit>
    },

    async removeManyWorkPermitsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IWorkPermitDoc<IWorkPermit[]>
    },

    async removeAllWorkPermits(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IWorkPermitDoc<string>
    }
  }
}

export default resolver