import { MessageModel } from "../../Models/Message/message.schema"
import { IMessageResolver, IBasicID, IBasicIDs, IMessage, IMessageDoc, IPostMessage, IEditMessage, GQLResponseTag } from "../../Models/Message/message.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(MessageModel, GQLResponseTag).getAPICalls()

const resolver: IMessageResolver = {
  Query: {
    async fetchMessages(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IMessageDoc<IMessage[]>
    },

    async fetchOneMessageByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IMessageDoc<IMessage>
    },

    async fetchManyMessagesByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IMessageDoc<IMessage[]>
    }
  },

  Mutation: {
    async postMessage(_: any, prop: IPostMessage, __: any) {
      const response = await Create(prop.input) as unknown as IMessageDoc<IMessage>
      console.log("ss", response)
      return response
    },

    async editMessage(_: any, prop: IEditMessage, __: any) {
      return await Edit(prop.input) as unknown as IMessageDoc<IMessage>
    },

    async removeOneMessageByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IMessageDoc<IMessage>
    },

    async removeManyMessagesByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IMessageDoc<IMessage[]>
    },

    async removeAllMessages(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IMessageDoc<string>
    }
  }
}

export default resolver