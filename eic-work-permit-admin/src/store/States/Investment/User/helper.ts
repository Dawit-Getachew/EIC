import { IUser } from "src/models/InvestmentModels/user"

export const getUser = (_id: string, users: IUser[]): IUser => {
  const foundIndex = users.findIndex(user => String(user.service_id) === String(_id))
  return foundIndex >= 0? users[foundIndex] : {} as unknown as IUser
}