import { DocumentNumberModel } from "../../Models/DocumentNumber/document_number.schema"
import { IDocumentNumberResolver, IBasicID, IBasicIDs, IDocumentNumber, IDocumentNumberDoc, IPostDocumentNumber, IEditDocumentNumber, GQLResponseTag } from "../../Models/DocumentNumber/document_number.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(DocumentNumberModel, GQLResponseTag).getAPICalls()

const resolver: IDocumentNumberResolver = {
  Query: {
    async fetchDocumentNumbers(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IDocumentNumberDoc<IDocumentNumber[]>
    },

    async fetchOneDocumentNumberByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IDocumentNumberDoc<IDocumentNumber>
    },

    async fetchManyDocumentNumbersByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IDocumentNumberDoc<IDocumentNumber[]>
    }
  },

  Mutation: {
    async postDocumentNumber(_: any, prop: IPostDocumentNumber, __: any) {
      const count = await DocumentNumberModel.countDocuments()
      const document_number =`EIC-WP/${count+1}/${new Date().getFullYear()}`
      return await Create({...prop.input, document_number }) as unknown as IDocumentNumberDoc<IDocumentNumber>
    },

    async editDocumentNumber(_: any, prop: IEditDocumentNumber, __: any) {
      return await Edit(prop.input) as unknown as IDocumentNumberDoc<IDocumentNumber>
    },

    async removeOneDocumentNumberByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IDocumentNumberDoc<IDocumentNumber>
    },

    async removeManyDocumentNumbersByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IDocumentNumberDoc<IDocumentNumber[]>
    },

    async removeAllDocumentNumbers(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IDocumentNumberDoc<string>
    }
  }
}

export default resolver