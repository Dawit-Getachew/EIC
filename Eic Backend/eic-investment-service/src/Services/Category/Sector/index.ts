import SectorResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostSector, IEditSector } from "../../../Models/Category/Sector/sector.types"

export default class SectorService {
  static async fetchSectors() {
    return await (await SectorResolver.Query.fetchSectors({}, {}, {})).data
  }

  static async fetchOneSectorByID(prop: IBasicID) {
    return await (await SectorResolver.Query.fetchOneSectorByID({}, prop, {})).data
  }

  static async fetchManySectorsByID(prop: IBasicIDs) {
    return await (await SectorResolver.Query.fetchManySectorsByID({}, prop, {})).data
  }

  static async postSector(prop: IPostSector) {
    return await (await SectorResolver.Mutation.postSector({}, prop, {})).data
  }

  static async editSector(prop: IEditSector) {
    return await (await SectorResolver.Mutation.editSector({}, prop, {})).data
  }

  static async removeOneSectorByID(prop: IBasicID) {
    return await (await SectorResolver.Mutation.removeOneSectorByID({}, prop, {})).data
  }

  static async removeManySectorsByID(prop: IBasicIDs) {
    return await (await SectorResolver.Mutation.removeManySectorsByID({}, prop, {})).data
  }

  static async removeAllSectors() {
    return await (await SectorResolver.Mutation.removeAllSectors({}, {}, {})).data
  }
}