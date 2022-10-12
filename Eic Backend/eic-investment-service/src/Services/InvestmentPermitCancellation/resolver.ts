import { InvestmentPermitCancellationModel } from "../../Models/InvestmentPermitCancellation/investment_permit_cancellation.schema"
import { IInvestmentPermitCancellationResolver, IBasicID, IBasicIDs, IInvestmentPermitCancellation, IInvestmentPermitCancellationDoc, IPostInvestmentPermitCancellation, IEditInvestmentPermitCancellation, GQLResponseTag } from "../../Models/InvestmentPermitCancellation/investment_permit_cancellation.types"
import DBWrapper from "../../wrappers/APIGenerator"
import Notification from "../Notification/"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(InvestmentPermitCancellationModel, GQLResponseTag).getAPICalls()

const resolver: IInvestmentPermitCancellationResolver = {
  Query: {
    async fetchInvestmentPermitCancellations(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation[]>
    },

    async fetchOneInvestmentPermitCancellationByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation>
    },

    async fetchManyInvestmentPermitCancellationsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation[]>
    }
  },

  Mutation: {
    async postInvestmentPermitCancellation(_: any, prop: IPostInvestmentPermitCancellation, __: any) {
      const payload = await Create(prop.input) as unknown as IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation>
      await Notification.postNotification({
        input: {
          description: "You have created your investment cancellation request permit successfully",
          title: "Investment Permit Cancellation Request Created",
          icon: "SUCCESS",
          service_id: payload.data.service_id
        }
      })
      return payload
    },

    async editInvestmentPermitCancellation(_: any, prop: IEditInvestmentPermitCancellation, __: any) {
      const payload = await Edit(prop.input) as unknown as IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation>
      await Notification.postNotification({
        input: {
          description: `Your permit's investment cancellation status has been changed to ${payload.data.permit_status}`,
          title: "Investment Permit Cancellation Updated",
          icon: "SUCCESS",
          service_id: payload.data.service_id
        }
      })
      return payload
    },

    async removeOneInvestmentPermitCancellationByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation>
    },

    async removeManyInvestmentPermitCancellationsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IInvestmentPermitCancellationDoc<IInvestmentPermitCancellation[]>
    },

    async removeAllInvestmentPermitCancellations(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IInvestmentPermitCancellationDoc<string>
    }
  }
}

export default resolver