import { Role } from "../../../Common/constants"

export const ProjectActions = {
  Query: {
    fetchAll: "fetchProjects", fetchOneByID: "fetchOneProjectByID", fetchManyByID: "fetchManyProjectsByID",
  },
  Mutation: {
    post: "createProject", edit: "updateProject",
    removeOne: "removeOneProject", removeMany: "removeManyProjects", removeAll: "removeAllProjects"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(ProjectActions.Query),
        ...Object.values(ProjectActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(ProjectActions.Query), ProjectActions.Mutation.removeOne,
        ProjectActions.Mutation.post, ProjectActions.Mutation.edit, ProjectActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        ProjectActions.Query.fetchOneByID,
        ProjectActions.Mutation.edit
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
