import { Role } from "../../../../Common/constants"

export const SubSectorActions = {
  Query: {
    fetchAll: "fetchSubSectors", fetchOneByID: "fetchOneSubSectorByID", fetchManyByID: "fetchManySubSectorsByID",
  },
  Mutation: {
    post: "createSubSector", edit: "updateSubSector",
    removeOne: "removeOneSubSector", removeMany: "removeManySubSectors", removeAll: "removeAllSubSectors"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(SubSectorActions.Query),
        ...Object.values(SubSectorActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(SubSectorActions.Query), SubSectorActions.Mutation.removeOne,
        SubSectorActions.Mutation.post, SubSectorActions.Mutation.edit, SubSectorActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        SubSectorActions.Query.fetchOneByID,
        SubSectorActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
