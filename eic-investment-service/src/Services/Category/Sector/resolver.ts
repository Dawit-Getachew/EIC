import { SectorModel } from "../../../Models/Category/Sector/sector.schema"
import { ISectorResolver, IBasicID, IBasicIDs, ISector, ISectorDoc, IPostSector, IEditSector, GQLResponseTag } from "../../../Models/Category/Sector/sector.types"
import DBWrapper from "../../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(SectorModel, GQLResponseTag).getAPICalls()

const resolver: ISectorResolver = {
  Query: {
    async fetchSectors(_: any, __: any, ___: any) {
      return await Fetch() as unknown as ISectorDoc<ISector[]>
    },

    async fetchOneSectorByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as ISectorDoc<ISector>
    },

    async fetchManySectorsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as ISectorDoc<ISector[]>
    }
  },

  Mutation: {
    async postSector(_: any, prop: IPostSector, __: any) {
      return await Create(prop.input) as unknown as ISectorDoc<ISector>
    },

    async editSector(_: any, prop: IEditSector, __: any) {
      return await Edit(prop.input) as unknown as ISectorDoc<ISector>
    },

    async removeOneSectorByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as ISectorDoc<ISector>
    },

    async removeManySectorsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as ISectorDoc<ISector[]>
    },

    async removeAllSectors(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as ISectorDoc<string>
    }
  }
}

export default resolver