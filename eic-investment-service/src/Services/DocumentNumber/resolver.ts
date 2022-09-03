import { DocumentNumberModel } from "../../Models/DocumentNumber/document_number.schema"
import { IDocumentNumberResolver, IBasicID, IBasicIDs, IDocumentNumber, IDocumentNumberDoc, IPostDocumentNumber, IEditDocumentNumber, GQLResponseTag } from "../../Models/DocumentNumber/document_number.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(DocumentNumberModel, GQLResponseTag).getAPICalls()

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
      const document_amount = await (await DocumentNumberModel.countDocuments()) + 1
      let value = ''
      if (document_amount < 10) value = `000${document_amount}`
      else if (document_amount < 100) value = `00${document_amount}`
      else if (document_amount < 1000) value = `0${document_amount}`
      else if (document_amount < 10000) value = `0${document_amount}`
      let input = {
        value: `EIC-IP${value}/${`${new Date().getFullYear()}`.slice(2, 4)}`
      }
      return await Create(input) as unknown as IDocumentNumberDoc<IDocumentNumber>
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