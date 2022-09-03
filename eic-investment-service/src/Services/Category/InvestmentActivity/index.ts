import InvestmentActivityResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostInvestmentActivity, IEditInvestmentActivity } from "../../../Models/Category/InvestmentActivity/investment_activity.types"
import ActivityService from "../Activity"

export default class InvestmentActivityService {
  static async fetchInvestmentActivities() {
    return await (await InvestmentActivityResolver.Query.fetchInvestmentActivities({}, {}, {})).data
  }

  static async fetchOneInvestmentActivityByID(prop: IBasicID) {
    return await (await InvestmentActivityResolver.Query.fetchOneInvestmentActivityByID({}, prop, {})).data
  }

  static async fetchManyInvestmentActivitiesByID(prop: IBasicIDs) {
    return await (await InvestmentActivityResolver.Query.fetchManyInvestmentActivitiesByID({}, prop, {})).data
  }

  static async postInvestmentActivity(prop: IPostInvestmentActivity) {
    const foundActivity = await ActivityService.fetchOneActivityByID({ _id: prop.input.activity })
    if (!foundActivity._id) return foundActivity
    return await (await InvestmentActivityResolver.Mutation.postInvestmentActivity({}, prop, {})).data
  }

  static async editInvestmentActivity(prop: IEditInvestmentActivity) {
    if (prop.input.activity) {
      const foundActivity = await ActivityService.fetchOneActivityByID({ _id: prop.input.activity })
      if (!foundActivity._id) return foundActivity
    }
    return await (await InvestmentActivityResolver.Mutation.editInvestmentActivity({}, prop, {})).data
  }

  static async removeOneInvestmentActivityByID(prop: IBasicID) {
    return await (await InvestmentActivityResolver.Mutation.removeOneInvestmentActivityByID({}, prop, {})).data
  }

  static async removeManyInvestmentActivitiesByID(prop: IBasicIDs) {
    return await (await InvestmentActivityResolver.Mutation.removeManyInvestmentActivitiesByID({}, prop, {})).data
  }

  static async removeAllInvestmentActivities() {
    return await (await InvestmentActivityResolver.Mutation.removeAllInvestmentActivities({}, {}, {})).data
  }
}