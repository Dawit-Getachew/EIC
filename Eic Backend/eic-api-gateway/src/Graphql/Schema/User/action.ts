import { Role } from "../../../Common/constants"

export const UserActions = {
  Query: {
    fetchAll: "fetchUsers", fetchOneByID: "fetchOneUserByID", fetchManyByID: "fetchManyUsersByID",
    fetchUserInfoBySession: "fetchUserInfoBySession", fetchUserByServiceID: "fetchUserByServiceID"
  },
  Mutation: {
    post: "signUpUser", edit: "updateUser", login: "loginUser",
    removeOne: "removeOneUser", removeMany: "removeManyUsers", removeAll: "removeAllUsers", logout: "logoutUser",
    changeEmail: "changeUserEmail", changePhoneNumber: "changeUserPhoneNumber", changePassword: "changeUserPassword",
    updateResidence: "updateResidenceUser"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(UserActions.Query),
        ...Object.values(UserActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(UserActions.Query), UserActions.Mutation.removeOne,
        UserActions.Mutation.edit, UserActions.Mutation.removeMany
      ]

    case Role.USER:
      return [
        UserActions.Query.fetchOneByID, UserActions.Query.fetchUserInfoBySession,
        UserActions.Mutation.edit, UserActions.Mutation.logout
      ]

    case Role.PUBLIC_USER:
      return [
        UserActions.Mutation.login, UserActions.Mutation.post,
        UserActions.Query.fetchAll
      ]
    default:
      return []
  }
}
