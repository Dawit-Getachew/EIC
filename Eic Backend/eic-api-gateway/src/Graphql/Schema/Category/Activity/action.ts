import { Role } from "../../../../Common/constants"

export const ActivityActions = {
  Query: {
    fetchAll: "fetchActivities", fetchOneByID: "fetchOneActivityByID", fetchManyByID: "fetchManyActivitiesByID",
  },
  Mutation: {
    post: "createActivity", edit: "updateActivity",
    removeOne: "removeOneActivity", removeMany: "removeManyActivities", removeAll: "removeAllActivities"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(ActivityActions.Query),
        ...Object.values(ActivityActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(ActivityActions.Query), ActivityActions.Mutation.removeOne,
        ActivityActions.Mutation.post, ActivityActions.Mutation.edit, ActivityActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        ActivityActions.Query.fetchOneByID,
        ActivityActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
