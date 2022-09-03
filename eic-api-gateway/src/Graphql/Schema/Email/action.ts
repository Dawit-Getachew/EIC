import { Role } from "../../../Common/constants"

export const EmailActions = {
  Query: {},
  Mutation: {
    post: "sendEmail"
  }
}

export const getAllowedActions = (role: Role) => {
  switch (role) {
    case Role.TESTING:
      return [
        ...Object.values(EmailActions.Query),
        ...Object.values(EmailActions.Mutation)
      ]
      
    case Role.ADMIN:
      return [
        ...Object.values(EmailActions.Query),
        ...Object.values(EmailActions.Mutation)
      ]

    case Role.USER:
      return [
        ...Object.values(EmailActions.Query),
        ...Object.values(EmailActions.Mutation)
      ]

    case Role.PUBLIC_USER:
      return []
    default:
      return []
  }
}
