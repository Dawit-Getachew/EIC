import { BusinessProfileModel } from "../../Models/BusinessProfile/business_profile.schema"
import { IBusinessProfileResolver, IBasicID, IBasicIDs, IBusinessProfile, IBusinessProfileDoc, IPostBusinessProfile, IEditBusinessProfile, GQLResponseTag } from "../../Models/BusinessProfile/business_profile.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(BusinessProfileModel, GQLResponseTag).getAPICalls()

const resolver: IBusinessProfileResolver = {
  Query: {
    async fetchBusinessProfiles(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IBusinessProfileDoc<IBusinessProfile[]>
    },

    async fetchOneBusinessProfileByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IBusinessProfileDoc<IBusinessProfile>
    },

    async fetchManyBusinessProfilesByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IBusinessProfileDoc<IBusinessProfile[]>
    }
  },

  Mutation: {
    async postBusinessProfile(_: any, prop: IPostBusinessProfile, __: any) {
      return await Create(prop.input) as unknown as IBusinessProfileDoc<IBusinessProfile>
    },

    async editBusinessProfile(_: any, prop: IEditBusinessProfile, __: any) {
      return await Edit(prop.input) as unknown as IBusinessProfileDoc<IBusinessProfile>
    },

    async removeOneBusinessProfileByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IBusinessProfileDoc<IBusinessProfile>
    },

    async removeManyBusinessProfilesByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IBusinessProfileDoc<IBusinessProfile[]>
    },

    async removeAllBusinessProfiles(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IBusinessProfileDoc<string>
    }
  }
}

export default resolver