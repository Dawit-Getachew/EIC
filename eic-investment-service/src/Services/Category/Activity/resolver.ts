import { ActivityModel } from "../../../Models/Category/Activity/activity.schema"
import { IActivityResolver, IBasicID, IBasicIDs, IActivity, IActivityDoc, IPostActivity, IEditActivity, GQLResponseTag } from "../../../Models/Category/Activity/activity.types"
import DBWrapper from "../../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(ActivityModel, GQLResponseTag).getAPICalls()

const resolver: IActivityResolver = {
  Query: {
    async fetchActivities(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IActivityDoc<IActivity[]>
    },

    async fetchOneActivityByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IActivityDoc<IActivity>
    },

    async fetchManyActivitiesByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IActivityDoc<IActivity[]>
    }
  },

  Mutation: {
    async postActivity(_: any, prop: IPostActivity, __: any) {
      return await Create(prop.input) as unknown as IActivityDoc<IActivity>
    },

    async editActivity(_: any, prop: IEditActivity, __: any) {
      return await Edit(prop.input) as unknown as IActivityDoc<IActivity>
    },

    async removeOneActivityByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IActivityDoc<IActivity>
    },

    async removeManyActivitiesByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IActivityDoc<IActivity[]>
    },

    async removeAllActivities(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IActivityDoc<string>
    }
  }
}

export default resolver