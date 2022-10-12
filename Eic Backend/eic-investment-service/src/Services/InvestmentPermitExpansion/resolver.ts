import { InvestmentPermitExpansionModel } from "../../Models/InvestmentPermitExpansion/investment_permit_expansion.schema"
import { IInvestmentPermitExpansionResolver, IBasicID, IBasicIDs, IInvestmentPermitExpansion, IInvestmentPermitExpansionDoc, IPostInvestmentPermitExpansion, IEditInvestmentPermitExpansion, GQLResponseTag } from "../../Models/InvestmentPermitExpansion/investment_permit_expansion.types"
import DBWrapper from "../../wrappers/APIGenerator"
import DocumentNumber from "../DocumentNumber/"
import Notification from "../Notification/"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(InvestmentPermitExpansionModel, GQLResponseTag).getAPICalls()

const resolver: IInvestmentPermitExpansionResolver = {
  Query: {
    async fetchInvestmentPermitExpansions(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion[]>
    },

    async fetchOneInvestmentPermitExpansionByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion>
    },

    async fetchManyInvestmentPermitExpansionsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion[]>
    }
  },

  Mutation: {
    async postInvestmentPermitExpansion(_: any, prop: IPostInvestmentPermitExpansion, __: any) {
      const ref_number = await DocumentNumber.postDocumentNumber()
      const payload = await Create({
        ...prop.input,
        ref_number: ref_number.value
      }) as unknown as IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion>
      await Notification.postNotification({
        input: {
          description: "You have created your investment permit expansion successfully",
          title: "Investment Expansion Permit Request Created",
          icon: "SUCCESS",
          service_id: payload.data.investor_id
        }
      })
      return payload
    },

    async editInvestmentPermitExpansion(_: any, prop: IEditInvestmentPermitExpansion, __: any) {
      const payload = await Edit(prop.input) as unknown as IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion>
      await Notification.postNotification({
        input: {
          description: `Your expansion permit's status has been changed to ${payload.data.permit_status}`,
          title: "Investment Expansion Permit Updated",
          icon: "SUCCESS",
          service_id: payload.data.investor_id
        }
      })
      return payload
    },

    async removeOneInvestmentPermitExpansionByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion>
    },

    async removeManyInvestmentPermitExpansionsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion[]>
    },

    async removeAllInvestmentPermitExpansions(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IInvestmentPermitExpansionDoc<string>
    }
  }
}

export default resolver