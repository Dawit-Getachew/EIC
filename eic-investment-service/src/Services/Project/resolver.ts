import { ProjectModel } from "../../Models/Project/project.schema"
import { IProjectResolver, IBasicID, IBasicIDs, IProject, IProjectDoc, IPostProject, IEditProject, GQLResponseTag } from "../../Models/Project/project.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany, Find } = new DBWrapper(ProjectModel, GQLResponseTag).getAPICalls()

const resolver: IProjectResolver = {
  Query: {
    async fetchProjects(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IProjectDoc<IProject[]>
    },

    async fetchOneProjectByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IProjectDoc<IProject>
    },

    async fetchManyProjectsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IProjectDoc<IProject[]>
    }
  },

  Mutation: {
    async postProject(_: any, prop: IPostProject, __: any) {
      return await Create(prop.input) as unknown as IProjectDoc<IProject>
    },

    async editProject(_: any, prop: IEditProject, __: any) {
      return await Edit(prop.input) as unknown as IProjectDoc<IProject>
    },

    async removeOneProjectByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IProjectDoc<IProject>
    },

    async removeManyProjectsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IProjectDoc<IProject[]>
    },

    async removeAllProjects(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IProjectDoc<string>
    }
  }
}

export default resolver