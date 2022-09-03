import { Role } from "../../../Common/constants"

export const ReplaceWorkPermitActions = {
  Query: {
    fetchAll: "fetchReplaceWorkPermits", fetchOneByID: "fetchOneReplaceWorkPermitByID", fetchManyByID: "fetchManyReplaceWorkPermitsByID",
    fetchMyReplacementWorkPermits: "fetchMyReplacementWorkPermits"
  },
  Mutation: {
    post: "createReplaceWorkPermit", edit: "updateReplaceWorkPermit",
    removeOne: "removeOneReplaceWorkPermit", removeMany: "removeManyReplaceWorkPermits", removeAll: "removeAllReplaceWorkPermits"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(ReplaceWorkPermitActions.Query),
        ...Object.values(ReplaceWorkPermitActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(ReplaceWorkPermitActions.Query), ReplaceWorkPermitActions.Mutation.removeOne,
        ReplaceWorkPermitActions.Mutation.post, ReplaceWorkPermitActions.Mutation.edit, ReplaceWorkPermitActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        ReplaceWorkPermitActions.Query.fetchOneByID,
        ReplaceWorkPermitActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
