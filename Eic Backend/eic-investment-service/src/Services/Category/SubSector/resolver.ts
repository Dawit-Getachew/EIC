import { SubSectorModel } from "../../../Models/Category/SubSector/sub_sector.schema"
import { ISubSectorResolver, IBasicID, IBasicIDs, ISubSector, ISubSectorDoc, IPostSubSector, IEditSubSector, GQLResponseTag } from "../../../Models/Category/SubSector/sub_sector.types"
import DBWrapper from "../../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(SubSectorModel, GQLResponseTag).getAPICalls()

const resolver: ISubSectorResolver = {
  Query: {
    async fetchSubSectors(_: any, __: any, ___: any) {
      return await Fetch() as unknown as ISubSectorDoc<ISubSector[]>
    },

    async fetchOneSubSectorByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as ISubSectorDoc<ISubSector>
    },

    async fetchManySubSectorsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as ISubSectorDoc<ISubSector[]>
    }
  },

  Mutation: {
    async postSubSector(_: any, prop: IPostSubSector, __: any) {
      return await Create(prop.input) as unknown as ISubSectorDoc<ISubSector>
    },

    async editSubSector(_: any, prop: IEditSubSector, __: any) {
      return await Edit(prop.input) as unknown as ISubSectorDoc<ISubSector>
    },

    async removeOneSubSectorByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as ISubSectorDoc<ISubSector>
    },

    async removeManySubSectorsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as ISubSectorDoc<ISubSector[]>
    },

    async removeAllSubSectors(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as ISubSectorDoc<string>
    }
  }
}

export default resolver