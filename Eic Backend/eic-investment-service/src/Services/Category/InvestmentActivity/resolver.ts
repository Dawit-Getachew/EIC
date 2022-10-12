import { InvestmentActivityModel } from "../../../Models/Category/InvestmentActivity/investment_activity.schema"
import { IInvestmentActivityResolver, IBasicID, IBasicIDs, IInvestmentActivity, IInvestmentActivityDoc, IPostInvestmentActivity, IEditInvestmentActivity, GQLResponseTag } from "../../../Models/Category/InvestmentActivity/investment_activity.types"
import DBWrapper from "../../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(InvestmentActivityModel, GQLResponseTag).getAPICalls()

const resolver: IInvestmentActivityResolver = {
  Query: {
    async fetchInvestmentActivities(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IInvestmentActivityDoc<IInvestmentActivity[]>
    },

    async fetchOneInvestmentActivityByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IInvestmentActivityDoc<IInvestmentActivity>
    },

    async fetchManyInvestmentActivitiesByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IInvestmentActivityDoc<IInvestmentActivity[]>
    }
  },

  Mutation: {
    async postInvestmentActivity(_: any, prop: IPostInvestmentActivity, __: any) {
      return await Create(prop.input) as unknown as IInvestmentActivityDoc<IInvestmentActivity>
    },

    async editInvestmentActivity(_: any, prop: IEditInvestmentActivity, __: any) {
      return await Edit(prop.input) as unknown as IInvestmentActivityDoc<IInvestmentActivity>
    },

    async removeOneInvestmentActivityByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IInvestmentActivityDoc<IInvestmentActivity>
    },

    async removeManyInvestmentActivitiesByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IInvestmentActivityDoc<IInvestmentActivity[]>
    },

    async removeAllInvestmentActivities(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IInvestmentActivityDoc<string>
    }
  }
}

export default resolver