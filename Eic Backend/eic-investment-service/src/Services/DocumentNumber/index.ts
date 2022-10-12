import { IRabbitMQServerMessage } from "../../Common/interface"
import { DocumentNumberRoutes } from "../../Common/routes"
import DocumentNumberResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostDocumentNumber, IEditDocumentNumber } from "../../Models/DocumentNumber/document_number.types"

export const DocumentNumberController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case DocumentNumberRoutes.GET_ALL_DOCUMENT_NUMBERS: {
      return await DocumentNumberService.fetchDocumentNumbers()
    }

    case DocumentNumberRoutes.GET_ONE_DOCUMENT_NUMBER: {
      return await DocumentNumberService.fetchOneDocumentNumberByID(payload.data)
    }

    case DocumentNumberRoutes.GET_MANY_DOCUMENT_NUMBERS_BY_ID: {
      return await DocumentNumberService.fetchManyDocumentNumbersByID(payload.data)
    }

    case DocumentNumberRoutes.POST_DOCUMENT_NUMBER: {
      return await DocumentNumberService.postDocumentNumber()
    }

    case DocumentNumberRoutes.EDIT_DOCUMENT_NUMBER: {
      return await DocumentNumberService.editDocumentNumber(payload.data)
    }

    case DocumentNumberRoutes.REMOVE_DOCUMENT_NUMBER_BY_ID: {
      return await DocumentNumberService.removeOneDocumentNumberByID(payload.data)
    }

    case DocumentNumberRoutes.REMOVE_MANY_DOCUMENT_NUMBERS_BY_ID: {
      return await DocumentNumberService.removeManyDocumentNumbersByID(payload.data)
    }

    case DocumentNumberRoutes.REMOVE_ALL_DOCUMENT_NUMBERS: {
      return await DocumentNumberService.removeAllDocumentNumbers()
    }

    default: return {}
  }
}

export default class DocumentNumberService {
  static async fetchDocumentNumbers() {
    return await (await DocumentNumberResolver.Query.fetchDocumentNumbers({}, {}, {})).data
  }

  static async fetchOneDocumentNumberByID(prop: IBasicID) {
    return await (await DocumentNumberResolver.Query.fetchOneDocumentNumberByID({}, prop, {})).data
  }

  static async fetchManyDocumentNumbersByID(prop: IBasicIDs) {
    return await (await DocumentNumberResolver.Query.fetchManyDocumentNumbersByID({}, prop, {})).data
  }

  static async postDocumentNumber() {
    return await (await DocumentNumberResolver.Mutation.postDocumentNumber({}, { input: { value: '' } }, {})).data
  }

  static async editDocumentNumber(prop: IEditDocumentNumber) {
    return await (await DocumentNumberResolver.Mutation.editDocumentNumber({}, prop, {})).data
  }

  static async removeOneDocumentNumberByID(prop: IBasicID) {
    return await (await DocumentNumberResolver.Mutation.removeOneDocumentNumberByID({}, prop, {})).data
  }

  static async removeManyDocumentNumbersByID(prop: IBasicIDs) {
    return await (await DocumentNumberResolver.Mutation.removeManyDocumentNumbersByID({}, prop, {})).data
  }

  static async removeAllDocumentNumbers() {
    return await (await DocumentNumberResolver.Mutation.removeAllDocumentNumbers({}, {}, {})).data
  }
}