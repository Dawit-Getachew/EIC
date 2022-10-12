import { Role } from "../../../Common/constants"

export const AccountActions = {
  Query: {
    fetchAll: "fetchAccounts", fetchOneByID: "fetchOneAccountByID", fetchManyByID: "fetchManyAccountsByID",
    fetchUserInfoBySession: "fetchAccountInfoBySession"
  },
  Mutation: {
    post: "signUpAccount", postAccount: "postAccount", edit: "updateAccount", login: "loginAccount",
    removeOne: "removeOneAccount", removeMany: "removeManyAccounts", removeAll: "removeAllAccounts", logout: "logoutAccount"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(AccountActions.Query),
        ...Object.values(AccountActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(AccountActions.Query), AccountActions.Mutation.removeOne,
        AccountActions.Mutation.edit, AccountActions.Mutation.removeMany, AccountActions.Mutation.logout
      ]

    case Role.USER:
      return []

    case Role.PUBLIC_USER:
      return [
        AccountActions.Mutation.login, AccountActions.Mutation.post,
        AccountActions.Query.fetchAll
      ]
    default:
      return []
  }
}
