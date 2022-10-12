import { InvestmentPermitRenewalModel } from "../../Models/InvestmentPermitRenewal/investment_permit_renewal.schema"
import { IInvestmentPermitRenewalResolver, IBasicID, IBasicIDs, IInvestmentPermitRenewal, IInvestmentPermitRenewalDoc, IPostInvestmentPermitRenewal, IEditInvestmentPermitRenewal, GQLResponseTag } from "../../Models/InvestmentPermitRenewal/investment_permit_renewal.types"
import DBWrapper from "../../wrappers/APIGenerator"
import Notification from "../Notification/"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(InvestmentPermitRenewalModel, GQLResponseTag).getAPICalls()

const resolver: IInvestmentPermitRenewalResolver = {
  Query: {
    async fetchInvestmentPermitRenewals(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal[]>
    },

    async fetchOneInvestmentPermitRenewalByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal>
    },

    async fetchManyInvestmentPermitRenewalsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal[]>
    }
  },

  Mutation: {
    async postInvestmentPermitRenewal(_: any, prop: IPostInvestmentPermitRenewal, __: any) {
      const payload = await Create(prop.input) as unknown as IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal>
      await Notification.postNotification({
        input: {
          description: "You have created your investment renewal request permit successfully",
          title: "Investment Permit Renewal Request Created",
          icon: "SUCCESS",
          service_id: payload.data.service_id
        }
      })
      return payload
    },

    async editInvestmentPermitRenewal(_: any, prop: IEditInvestmentPermitRenewal, __: any) {
      const payload = await Edit(prop.input) as unknown as IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal>
      await Notification.postNotification({
        input: {
          description: `Your permit's investment renewal status has been changed to ${payload.data.permit_status}`,
          title: "Investment Permit Renewal Updated",
          icon: "SUCCESS",
          service_id: payload.data.service_id
        }
      })
      return payload
    },

    async removeOneInvestmentPermitRenewalByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal>
    },

    async removeManyInvestmentPermitRenewalsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IInvestmentPermitRenewalDoc<IInvestmentPermitRenewal[]>
    },

    async removeAllInvestmentPermitRenewals(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IInvestmentPermitRenewalDoc<string>
    }
  }
}

export default resolver