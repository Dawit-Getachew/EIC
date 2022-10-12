import { AccountModel } from "../../Models/Account/account.schema"
import { IAccountResolver, IBasicID, IBasicIDs, IAccount, IAccountDoc, IPostAccount, IEditAccount, GQLResponseTag, IPostCompany } from "../../Models/Account/account.types"
import DBWrapper from "../../wrappers/APIGenerator";

export const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(AccountModel, GQLResponseTag).getAPICalls()

const resolver: IAccountResolver = {
  Query: {
    async fetchAccounts(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IAccountDoc<IAccount[]>
    },

    async fetchOneAccountByID(_: any, prop: IBasicID, ___: any) {
      const response = await FetchOne(prop._id) as unknown as IAccountDoc<IAccount>
      return response
    },

    async fetchManyAccountsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IAccountDoc<IAccount[]>
    }
  },

  Mutation: {
    async postAccount(_: any, prop: IPostAccount | IPostCompany, __: any) {
      return await Create(prop.input) as unknown as IAccountDoc<IAccount>
    },

    async editAccount(_: any, prop: IEditAccount, __: any) {
      return await Edit(prop.input) as unknown as IAccountDoc<IAccount>
    },

    async removeOneAccountByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IAccountDoc<IAccount>
    },

    async removeManyAccountsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IAccountDoc<IAccount[]>
    },

    async removeAllAccounts(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IAccountDoc<string>
    }
  }
}

export default resolver