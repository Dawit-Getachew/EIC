import { IAccount } from "src/models/InvestmentModels/account"

export const getAccountByID = (_id: string, users: IAccount[]): IAccount => {
  const foundIndex = users.findIndex(user => String(user._id) === String(_id))
  return foundIndex >= 0? users[foundIndex] : {} as unknown as IAccount
}

export const getAccount = (_id: string, accounts: IAccount[]): IAccount => {
  const foundIndex = accounts.findIndex(user => String(user.service_id) === String(_id))
  return foundIndex >= 0? accounts[foundIndex] : {} as unknown as IAccount
}