import SubSectorResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostSubSector, IEditSubSector } from "../../../Models/Category/SubSector/sub_sector.types"
import SectorService from "../Sector/"

export default class SubSectorService {
  static async fetchSubSectors() {
    return await (await SubSectorResolver.Query.fetchSubSectors({}, {}, {})).data
  }

  static async fetchOneSubSectorByID(prop: IBasicID) {
    return await (await SubSectorResolver.Query.fetchOneSubSectorByID({}, prop, {})).data
  }

  static async fetchManySubSectorsByID(prop: IBasicIDs) {
    return await (await SubSectorResolver.Query.fetchManySubSectorsByID({}, prop, {})).data
  }

  static async postSubSector(prop: IPostSubSector) {
    const foundSector = await SectorService.fetchOneSectorByID({ _id: prop.input.sector })
    if (!foundSector._id) return foundSector
    return await (await SubSectorResolver.Mutation.postSubSector({}, prop, {})).data
  }

  static async editSubSector(prop: IEditSubSector) {
    if (prop.input.sector) {
      const foundSector = await SectorService.fetchOneSectorByID({ _id: prop.input.sector })
      if (!foundSector._id) return foundSector
    }
    return await (await SubSectorResolver.Mutation.editSubSector({}, prop, {})).data
  }

  static async removeOneSubSectorByID(prop: IBasicID) {
    return await (await SubSectorResolver.Mutation.removeOneSubSectorByID({}, prop, {})).data
  }

  static async removeManySubSectorsByID(prop: IBasicIDs) {
    return await (await SubSectorResolver.Mutation.removeManySubSectorsByID({}, prop, {})).data
  }

  static async removeAllSubSectors() {
    return await (await SubSectorResolver.Mutation.removeAllSubSectors({}, {}, {})).data
  }
}