import { Role } from "../../../../Common/constants"

export const SectorActions = {
  Query: {
    fetchAll: "fetchSectors", fetchOneByID: "fetchOneSectorByID", fetchManyByID: "fetchManySectorsByID",
  },
  Mutation: {
    post: "createSector", edit: "updateSector",
    removeOne: "removeOneSector", removeMany: "removeManySectors", removeAll: "removeAllSectors"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(SectorActions.Query),
        ...Object.values(SectorActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(SectorActions.Query), SectorActions.Mutation.removeOne,
        SectorActions.Mutation.post, SectorActions.Mutation.edit, SectorActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        SectorActions.Query.fetchOneByID,
        SectorActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
