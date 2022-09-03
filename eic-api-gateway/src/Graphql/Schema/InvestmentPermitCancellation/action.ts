import { Role } from "../../../Common/constants"

export const InvestmentPermitCancellationActions = {
  Query: {
    fetchAll: "fetchInvestmentPermitCancellations", fetchOneByID: "fetchOneInvestmentPermitCancellationByID", fetchManyByID: "fetchManyInvestmentPermitCancellationsByID",
  },
  Mutation: {
    post: "createInvestmentPermitCancellation", edit: "updateInvestmentPermitCancellation",
    removeOne: "removeOneInvestmentPermitCancellation", removeMany: "removeManyInvestmentPermitCancellations", removeAll: "removeAllInvestmentPermitCancellations"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(InvestmentPermitCancellationActions.Query),
        ...Object.values(InvestmentPermitCancellationActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(InvestmentPermitCancellationActions.Query), InvestmentPermitCancellationActions.Mutation.removeOne,
        InvestmentPermitCancellationActions.Mutation.post, InvestmentPermitCancellationActions.Mutation.edit, InvestmentPermitCancellationActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        InvestmentPermitCancellationActions.Query.fetchOneByID,
        InvestmentPermitCancellationActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
