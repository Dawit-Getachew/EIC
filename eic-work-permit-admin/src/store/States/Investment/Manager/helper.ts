import { IManager } from "src/models/InvestmentModels/manager"

export const getManager = (_id: string, managers: IManager[]): IManager => {
  const foundIndex = managers.findIndex(manager => String(manager._id) === String(_id))
  return foundIndex >= 0? managers[foundIndex] : {} as unknown as IManager
}