import { InvestmentPermitModel } from "../../Models/InvestmentPermit/investment_permit.schema"
import { IInvestmentPermitResolver, IBasicID, IBasicIDs, IInvestmentPermit, IInvestmentPermitDoc, IPostInvestmentPermit, IEditInvestmentPermit, GQLResponseTag } from "../../Models/InvestmentPermit/investment_permit.types"
import DocumentNumber from "../DocumentNumber/"
import Notification from "../Notification/"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(InvestmentPermitModel, GQLResponseTag).getAPICalls()

const resolver: IInvestmentPermitResolver = {
  Query: {
    async fetchInvestmentPermits(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IInvestmentPermitDoc<IInvestmentPermit[]>
    },

    async fetchOneInvestmentPermitByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IInvestmentPermitDoc<IInvestmentPermit>
    },

    async fetchManyInvestmentPermitsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IInvestmentPermitDoc<IInvestmentPermit[]>
    }
  },

  Mutation: {
    async postInvestmentPermit(_: any, prop: IPostInvestmentPermit, __: any) {
      const ref_number = await DocumentNumber.postDocumentNumber()

      const payload = await Create({
        ...prop.input,
        ref_number: ref_number.value
      }) as unknown as IInvestmentPermitDoc<IInvestmentPermit>
      await Notification.postNotification({
        input: {
          description: "You have created your investment permit successfully",
          title: "Investment Permit Created",
          icon: "SUCCESS",
          service_id: payload.data.investor_id
        }
      })
      return payload
    },

    async editInvestmentPermit(_: any, prop: IEditInvestmentPermit, __: any) {
      const payload = await Edit(prop.input) as unknown as IInvestmentPermitDoc<IInvestmentPermit>
      await Notification.postNotification({
        input: {
          description: `Your permit's status has been changed to ${payload.data.permit_status}`,
          title: "Investment Permit Updated",
          icon: "SUCCESS",
          service_id: payload.data.investor_id
        }
      })
      return payload
    },

    async removeOneInvestmentPermitByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IInvestmentPermitDoc<IInvestmentPermit>
    },

    async removeManyInvestmentPermitsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IInvestmentPermitDoc<IInvestmentPermit[]>
    },

    async removeAllInvestmentPermits(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IInvestmentPermitDoc<string>
    }
  }
}

export default resolver