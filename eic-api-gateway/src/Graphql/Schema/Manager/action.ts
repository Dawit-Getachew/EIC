import { Role } from "../../../Common/constants"

export const ManagerActions = {
  Query: {
    fetchAll: "fetchManagers", fetchOneByID: "fetchOneManagerByID", fetchManyByID: "fetchManyManagersByID",
  },
  Mutation: {
    post: "createManager", edit: "updateManager",
    removeOne: "removeOneManager", removeMany: "removeManyManagers", removeAll: "removeAllManagers"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(ManagerActions.Query),
        ...Object.values(ManagerActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(ManagerActions.Query), ManagerActions.Mutation.removeOne,
        ManagerActions.Mutation.post, ManagerActions.Mutation.edit, ManagerActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        ManagerActions.Query.fetchOneByID,
        ManagerActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
