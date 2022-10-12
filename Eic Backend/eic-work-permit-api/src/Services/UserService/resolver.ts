import { UserModel } from "../../Models/User/user.schema"
import { IUserResolver, IBasicID, IBasicIDs, IUser, IUserDoc, IPostUser, IEditUser, GQLResponseTag, IPostCompany } from "../../Models/User/user.types"
import DBWrapper from "../../wrappers/APIGenerator";

export const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(UserModel, GQLResponseTag).getAPICalls()

const resolver = {
  Query: {
    async fetchUsers(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IUserDoc<IUser[]>
    },

    async fetchOneUserByID(_: any, prop: IBasicID, ___: any) {
      const response = await FetchOne(prop._id) as unknown as IUserDoc<IUser>
      return response
    },

    async fetchOneUserByServiceID(_: any, prop: IBasicID, ___: any) {
      const response = await FetchOne(prop._id, "service_id") as unknown as IUserDoc<IUser>
      return response
    },

    async fetchManyUsersByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IUserDoc<IUser[]>
    }
  },

  Mutation: {
    async postUser(_: any, prop: IPostUser | IPostCompany, __: any) {
      return await Create(prop.input) as unknown as IUserDoc<IUser>
    },

    async editUser(_: any, prop: IEditUser, __: any) {
      return await Edit(prop.input) as unknown as IUserDoc<IUser>
    },

    async removeOneUserByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IUserDoc<IUser>
    },

    async removeManyUsersByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IUserDoc<IUser[]>
    },

    async removeAllUsers(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IUserDoc<string>
    }
  }
}

export default resolver