import { Role } from "../../../Common/constants"

export const WorkPermitActions = {
  Query: {
    fetchAll: "fetchWorkPermits", fetchOneByID: "fetchOneWorkPermitByID", fetchManyByID: "fetchManyWorkPermitsByID",
    fetchUnAssigned: "fetchUnAssignedWorkPermits", fetchAssigned: "fetchAssignedWorkPermits", fetchAdminWorks: "fetchAdminWorkPermits",
    fetchMyPermits: "fetchMyWorkPermits"
  },
  Mutation: {
    post: "createWorkPermit", edit: "updateWorkPermit",
    removeOne: "removeOneWorkPermit", removeMany: "removeManyWorkPermits", removeAll: "removeAllWorkPermits",
    assignToAdmins: "assignWorkPermitToAdmins"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(WorkPermitActions.Query),
        ...Object.values(WorkPermitActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(WorkPermitActions.Query), WorkPermitActions.Mutation.removeOne,
        WorkPermitActions.Mutation.post, WorkPermitActions.Mutation.edit, WorkPermitActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        WorkPermitActions.Query.fetchOneByID,
        WorkPermitActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
