import ActivityResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostActivity, IEditActivity } from "../../../Models/Category/Activity/activity.types"
import SubSectorService from "../SubSector"

export default class ActivityService {
  static async fetchActivities() {
    return await (await ActivityResolver.Query.fetchActivities({}, {}, {})).data
  }

  static async fetchOneActivityByID(prop: IBasicID) {
    return await (await ActivityResolver.Query.fetchOneActivityByID({}, prop, {})).data
  }

  static async fetchManyActivitiesByID(prop: IBasicIDs) {
    return await (await ActivityResolver.Query.fetchManyActivitiesByID({}, prop, {})).data
  }

  static async postActivity(prop: IPostActivity) {
    const foundSector = await SubSectorService.fetchOneSubSectorByID({ _id: prop.input.sub_sector })
    if (!foundSector._id) return foundSector
    return await (await ActivityResolver.Mutation.postActivity({}, prop, {})).data
  }

  static async editActivity(prop: IEditActivity) {
    if (prop.input.sub_sector) {
      const foundSector = await SubSectorService.fetchOneSubSectorByID({ _id: prop.input.sub_sector })
      if (!foundSector._id) return foundSector
    }
    return await (await ActivityResolver.Mutation.editActivity({}, prop, {})).data
  }

  static async removeOneActivityByID(prop: IBasicID) {
    return await (await ActivityResolver.Mutation.removeOneActivityByID({}, prop, {})).data
  }

  static async removeManyActivitiesByID(prop: IBasicIDs) {
    return await (await ActivityResolver.Mutation.removeManyActivitiesByID({}, prop, {})).data
  }

  static async removeAllActivities() {
    return await (await ActivityResolver.Mutation.removeAllActivities({}, {}, {})).data
  }
}