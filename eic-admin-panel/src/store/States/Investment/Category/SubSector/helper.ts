import { ISubSector } from "src/models/InvestmentModels/Category/sub_sector"

export const getSubSector = (_id: string, sub_sectors: ISubSector[]): ISubSector => {
  const foundIndex = sub_sectors.findIndex(sub_sector => String(sub_sector._id) === String(_id))
  return foundIndex >= 0? sub_sectors[foundIndex] : {} as unknown as ISubSector
}