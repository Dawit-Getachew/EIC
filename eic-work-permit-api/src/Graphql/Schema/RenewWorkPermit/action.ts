import { Role } from "../../../Common/constants"

export const RenewWorkPermitActions = {
  Query: {
    fetchAll: "fetchRenewWorkPermits", fetchOneByID: "fetchOneRenewWorkPermitByID", fetchManyByID: "fetchManyRenewWorkPermitsByID",
  },
  Mutation: {
    post: "createRenewWorkPermit", edit: "updateRenewWorkPermit",
    removeOne: "removeOneRenewWorkPermit", removeMany: "removeManyRenewWorkPermits", removeAll: "removeAllRenewWorkPermits"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(RenewWorkPermitActions.Query),
        ...Object.values(RenewWorkPermitActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(RenewWorkPermitActions.Query), RenewWorkPermitActions.Mutation.removeOne,
        RenewWorkPermitActions.Mutation.post, RenewWorkPermitActions.Mutation.edit, RenewWorkPermitActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        RenewWorkPermitActions.Query.fetchOneByID,
        RenewWorkPermitActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
