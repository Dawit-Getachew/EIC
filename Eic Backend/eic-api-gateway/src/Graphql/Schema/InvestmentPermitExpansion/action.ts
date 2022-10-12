import { Role } from "../../../Common/constants"

export const InvestmentPermitExpansionActions = {
  Query: {
    fetchAll: "fetchInvestmentPermitExpansions", fetchOneByID: "fetchOneInvestmentPermitExpansionByID", fetchManyByID: "fetchManyInvestmentPermitExpansionsByID",
  },
  Mutation: {
    post: "createInvestmentPermitExpansion", edit: "updateInvestmentPermitExpansion",
    removeOne: "removeOneInvestmentPermitExpansion", removeMany: "removeManyInvestmentPermitExpansions", removeAll: "removeAllInvestmentPermitExpansions"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(InvestmentPermitExpansionActions.Query),
        ...Object.values(InvestmentPermitExpansionActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(InvestmentPermitExpansionActions.Query), InvestmentPermitExpansionActions.Mutation.removeOne,
        InvestmentPermitExpansionActions.Mutation.post, InvestmentPermitExpansionActions.Mutation.edit, InvestmentPermitExpansionActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        InvestmentPermitExpansionActions.Query.fetchOneByID,
        InvestmentPermitExpansionActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
