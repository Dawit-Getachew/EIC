import { IUserDoc } from "./user.types"

export const resolveUser = (_id: string, users: IUserDoc[]): any => {
  const foundIndex = users.findIndex(user => user._id === _id)
  if (foundIndex >= 0) return users[foundIndex]
  return {
    error: {
      type: 400,
      message: "Not found"
    }
  }
}