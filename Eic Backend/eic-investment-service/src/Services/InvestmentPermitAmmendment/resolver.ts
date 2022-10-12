import { InvestmentPermitAmmendmentModel } from "../../Models/InvestmentPermitAmmendment/investment_permit_ammendment.schema"
import { IInvestmentPermitAmmendmentResolver, IBasicID, IBasicIDs, IInvestmentPermitAmmendment, IInvestmentPermitAmmendmentDoc, IPostInvestmentPermitAmmendment, IEditInvestmentPermitAmmendment, GQLResponseTag } from "../../Models/InvestmentPermitAmmendment/investment_permit_ammendment.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(InvestmentPermitAmmendmentModel, GQLResponseTag).getAPICalls()

const resolver: IInvestmentPermitAmmendmentResolver = {
  Query: {
    async fetchInvestmentPermitAmmendments(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment[]>
    },

    async fetchOneInvestmentPermitAmmendmentByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment>
    },

    async fetchManyInvestmentPermitAmmendmentsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment[]>
    }
  },

  Mutation: {
    async postInvestmentPermitAmmendment(_: any, prop: IPostInvestmentPermitAmmendment, __: any) {
      return await Create(prop.input) as unknown as IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment>
    },

    async editInvestmentPermitAmmendment(_: any, prop: IEditInvestmentPermitAmmendment, __: any) {
      return await Edit(prop.input) as unknown as IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment>
    },

    async removeOneInvestmentPermitAmmendmentByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment>
    },

    async removeManyInvestmentPermitAmmendmentsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IInvestmentPermitAmmendmentDoc<IInvestmentPermitAmmendment[]>
    },

    async removeAllInvestmentPermitAmmendments(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IInvestmentPermitAmmendmentDoc<string>
    }
  }
}

export default resolver