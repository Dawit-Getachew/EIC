import { Role } from "../../../../Common/constants"

export const InvestmentActivityActions = {
  Query: {
    fetchAll: "fetchInvestmentActivities", fetchOneByID: "fetchOneInvestmentActivityByID", fetchManyByID: "fetchManyInvestmentActivitiesByID",
  },
  Mutation: {
    post: "createInvestmentActivity", edit: "updateInvestmentActivity",
    removeOne: "removeOneInvestmentActivity", removeMany: "removeManyInvestmentActivities", removeAll: "removeAllInvestmentActivities"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(InvestmentActivityActions.Query),
        ...Object.values(InvestmentActivityActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(InvestmentActivityActions.Query), InvestmentActivityActions.Mutation.removeOne,
        InvestmentActivityActions.Mutation.post, InvestmentActivityActions.Mutation.edit, InvestmentActivityActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        InvestmentActivityActions.Query.fetchOneByID,
        InvestmentActivityActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
