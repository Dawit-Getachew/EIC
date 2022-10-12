import { Role } from "../../../Common/constants"

export const InvestmentPermitAmmendmentActions = {
  Query: {
    fetchAll: "fetchInvestmentPermitAmmendments", fetchOneByID: "fetchOneInvestmentPermitAmmendmentByID", fetchManyByID: "fetchManyInvestmentPermitAmmendmentsByID",
  },
  Mutation: {
    post: "createInvestmentPermitAmmendment", edit: "updateInvestmentPermitAmmendment",
    removeOne: "removeOneInvestmentPermitAmmendment", removeMany: "removeManyInvestmentPermitAmmendments", removeAll: "removeAllInvestmentPermitAmmendments"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(InvestmentPermitAmmendmentActions.Query),
        ...Object.values(InvestmentPermitAmmendmentActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(InvestmentPermitAmmendmentActions.Query), InvestmentPermitAmmendmentActions.Mutation.removeOne,
        InvestmentPermitAmmendmentActions.Mutation.post, InvestmentPermitAmmendmentActions.Mutation.edit, InvestmentPermitAmmendmentActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        InvestmentPermitAmmendmentActions.Query.fetchOneByID,
        InvestmentPermitAmmendmentActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
