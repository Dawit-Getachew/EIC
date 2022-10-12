import MessageResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostMessage, IEditMessage } from "../../Models/Message/message.types"
import { MessageRoutes } from "../../Common/routes"
import { IRabbitMQServerMessage } from "../../Common/interface"

export const MessageController = async (payload: IRabbitMQServerMessage) => {
  console.log("heresssdsfsd")
  switch (payload.route) {
    case MessageRoutes.GET_ALL_MESSAGES: {
      return await MessageService.fetchMessages()
    }

    case MessageRoutes.GET_ONE_MESSAGE: {
      return await MessageService.fetchOneMessageByID(payload.data)
    }

    case MessageRoutes.GET_MANY_MESSAGES_BY_ID: {
      return await MessageService.fetchManyMessagesByID(payload.data)
    }

    case MessageRoutes.POST_MESSAGE: {
      return await MessageService.postMessage(payload.data)
    }

    case MessageRoutes.EDIT_MESSAGE: {
      return await MessageService.editMessage(payload.data)
    }

    case MessageRoutes.REMOVE_MESSAGE_BY_ID: {
      return await MessageService.removeOneMessageByID(payload.data)
    }

    case MessageRoutes.REMOVE_MANY_MESSAGES_BY_ID: {
      return await MessageService.removeManyMessagesByID(payload.data)
    }

    case MessageRoutes.REMOVE_ALL_MESSAGES: {
      return await MessageService.removeAllMessages()
    }

    default: return {}
  }
}

export default class MessageService {
  static async fetchMessages() {
    return await (await MessageResolver.Query.fetchMessages({}, {}, {})).data
  }

  static async fetchOneMessageByID(prop: IBasicID) {
    return await (await MessageResolver.Query.fetchOneMessageByID({}, prop, {})).data
  }

  static async fetchManyMessagesByID(prop: IBasicIDs) {
    return await (await MessageResolver.Query.fetchManyMessagesByID({}, prop, {})).data
  }

  static async postMessage(prop: IPostMessage) {
    console.log("lol")
    return await (await MessageResolver.Mutation.postMessage({}, prop, {})).data
  }

  static async editMessage(prop: IEditMessage) {
    return await (await MessageResolver.Mutation.editMessage({}, prop, {})).data
  }

  static async removeOneMessageByID(prop: IBasicID) {
    return await (await MessageResolver.Mutation.removeOneMessageByID({}, prop, {})).data
  }

  static async removeManyMessagesByID(prop: IBasicIDs) {
    return await (await MessageResolver.Mutation.removeManyMessagesByID({}, prop, {})).data
  }

  static async removeAllMessages() {
    return await (await MessageResolver.Mutation.removeAllMessages({}, {}, {})).data
  }
}