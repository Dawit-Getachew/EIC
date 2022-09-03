import { Role } from "../../../Common/constants"

export const InvestmentPermitActions = {
  Query: {
    fetchAll: "fetchInvestmentPermits", fetchOneByID: "fetchOneInvestmentPermitByID", fetchManyByID: "fetchManyInvestmentPermitsByID",
    fetchAdminWorks: "fetchAdminInvestmentPermits", fetchUnAssigned: "fetchUnAssignedInvestmentPermits", fetchAssigned: "fetchAssignedInvestmentPermits",
    fetchMyPermits: "fetchMyInvestmentPermits"
  },
  Mutation: {
    post: "createInvestmentPermit", edit: "updateInvestmentPermit",
    removeOne: "removeOneInvestmentPermit", removeMany: "removeManyInvestmentPermits", removeAll: "removeAllInvestmentPermits",
    assignToAdmins: "assignInvestmentPermitToAdmins"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(InvestmentPermitActions.Query),
        ...Object.values(InvestmentPermitActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(InvestmentPermitActions.Query), InvestmentPermitActions.Mutation.removeOne,
        InvestmentPermitActions.Mutation.post, InvestmentPermitActions.Mutation.edit, InvestmentPermitActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        InvestmentPermitActions.Query.fetchOneByID,
        InvestmentPermitActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
