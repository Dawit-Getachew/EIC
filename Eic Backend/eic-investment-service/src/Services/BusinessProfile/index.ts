import { IRabbitMQServerMessage } from "../../Common/interface"
import { BusinessProfileRoutes } from "../../Common/routes"
import BusinessProfileResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostBusinessProfile, IEditBusinessProfile } from "../../Models/BusinessProfile/business_profile.types"

export const BusinessProfileController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case BusinessProfileRoutes.GET_ALL_BUSINESS_PROFILES: {
      return await BusinessProfileService.fetchBusinessProfiles()
    }

    case BusinessProfileRoutes.GET_ONE_BUSINESS_PROFILE: {
      return await BusinessProfileService.fetchOneBusinessProfileByID(payload.data)
    }

    case BusinessProfileRoutes.GET_MANY_BUSINESS_PROFILES_BY_ID: {
      return await BusinessProfileService.fetchManyBusinessProfilesByID(payload.data)
    }

    case BusinessProfileRoutes.POST_BUSINESS_PROFILE: {
      return await BusinessProfileService.postBusinessProfile(payload.data)
    }

    case BusinessProfileRoutes.EDIT_BUSINESS_PROFILE: {
      return await BusinessProfileService.editBusinessProfile(payload.data)
    }

    case BusinessProfileRoutes.REMOVE_BUSINESS_PROFILE_BY_ID: {
      return await BusinessProfileService.removeOneBusinessProfileByID(payload.data)
    }

    case BusinessProfileRoutes.REMOVE_MANY_BUSINESS_PROFILES_BY_ID: {
      return await BusinessProfileService.removeManyBusinessProfilesByID(payload.data)
    }

    case BusinessProfileRoutes.REMOVE_ALL_BUSINESS_PROFILES: {
      return await BusinessProfileService.removeAllBusinessProfiles()
    }

    default: return {}
  }
}

class BusinessProfileService {
  static async fetchBusinessProfiles() {
    return await (await BusinessProfileResolver.Query.fetchBusinessProfiles({}, {}, {})).data
  }

  static async fetchOneBusinessProfileByID(prop: IBasicID) {
    return await (await BusinessProfileResolver.Query.fetchOneBusinessProfileByID({}, prop, {})).data
  }

  static async fetchManyBusinessProfilesByID(prop: IBasicIDs) {
    return await (await BusinessProfileResolver.Query.fetchManyBusinessProfilesByID({}, prop, {})).data
  }

  static async postBusinessProfile(prop: IPostBusinessProfile) {
    return await (await BusinessProfileResolver.Mutation.postBusinessProfile({}, prop, {})).data
  }

  static async editBusinessProfile(prop: IEditBusinessProfile) {
    return await (await BusinessProfileResolver.Mutation.editBusinessProfile({}, prop, {})).data
  }

  static async removeOneBusinessProfileByID(prop: IBasicID) {
    return await (await BusinessProfileResolver.Mutation.removeOneBusinessProfileByID({}, prop, {})).data
  }

  static async removeManyBusinessProfilesByID(prop: IBasicIDs) {
    return await (await BusinessProfileResolver.Mutation.removeManyBusinessProfilesByID({}, prop, {})).data
  }

  static async removeAllBusinessProfiles() {
    return await (await BusinessProfileResolver.Mutation.removeAllBusinessProfiles({}, {}, {})).data
  }
}