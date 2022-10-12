import { Role } from "../../../Common/constants"

export const CancelWorkPermitActions = {
  Query: {
    fetchAll: "fetchCancelWorkPermits", fetchOneByID: "fetchOneCancelWorkPermitByID", fetchManyByID: "fetchManyCancelWorkPermitsByID",
    fetchMyCancelmentWorkPermits: "fetchMyWorkPermitCancellations"
  },
  Mutation: {
    post: "createCancelWorkPermit", edit: "updateCancelWorkPermit",
    removeOne: "removeOneCancelWorkPermit", removeMany: "removeManyCancelWorkPermits", removeAll: "removeAllCancelWorkPermits"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(CancelWorkPermitActions.Query),
        ...Object.values(CancelWorkPermitActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(CancelWorkPermitActions.Query), CancelWorkPermitActions.Mutation.removeOne,
        CancelWorkPermitActions.Mutation.post, CancelWorkPermitActions.Mutation.edit, CancelWorkPermitActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        CancelWorkPermitActions.Query.fetchOneByID,
        CancelWorkPermitActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
