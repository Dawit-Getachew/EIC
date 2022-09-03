import { ISector } from "src/models/InvestmentModels/Category/sector"

export const getSector = (_id: string, sectors: ISector[]): ISector => {
  const foundIndex = sectors.findIndex(sector => String(sector._id) === String(_id))
  return foundIndex >= 0? sectors[foundIndex] : {} as unknown as ISector
}