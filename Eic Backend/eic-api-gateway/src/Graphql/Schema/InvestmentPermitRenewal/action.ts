import { Role } from "../../../Common/constants"

export const InvestmentPermitRenewalActions = {
  Query: {
    fetchAll: "fetchInvestmentPermitRenewals", fetchOneByID: "fetchOneInvestmentPermitRenewalByID", fetchManyByID: "fetchManyInvestmentPermitRenewalsByID",
  },
  Mutation: {
    post: "createInvestmentPermitRenewal", edit: "updateInvestmentPermitRenewal",
    removeOne: "removeOneInvestmentPermitRenewal", removeMany: "removeManyInvestmentPermitRenewals", removeAll: "removeAllInvestmentPermitRenewals"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(InvestmentPermitRenewalActions.Query),
        ...Object.values(InvestmentPermitRenewalActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(InvestmentPermitRenewalActions.Query), InvestmentPermitRenewalActions.Mutation.removeOne,
        InvestmentPermitRenewalActions.Mutation.post, InvestmentPermitRenewalActions.Mutation.edit, InvestmentPermitRenewalActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        InvestmentPermitRenewalActions.Query.fetchOneByID,
        InvestmentPermitRenewalActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
