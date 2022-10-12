import { IRabbitMQServerMessage } from "../../Common/interface"
import { ProjectRoutes } from "../../Common/routes"
import ProjectResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostProject, IEditProject } from "../../Models/Project/project.types"
import SectorService from "../Category/Sector/"
import SubSectorService from "../Category/SubSector/"
import ActivityService from "../Category/Activity/"
import InvestmentActivityService from "../Category/InvestmentActivity/"

export const ProjectController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case ProjectRoutes.GET_ALL_PROJECTS: {
      return await ProjectService.fetchProjects()
    }

    case ProjectRoutes.GET_ONE_PROJECT: {
      return await ProjectService.fetchOneProjectByID(payload.data)
    }

    case ProjectRoutes.GET_MANY_PROJECTS_BY_ID: {
      return await ProjectService.fetchManyProjectsByID(payload.data)
    }

    case ProjectRoutes.POST_PROJECT: {
      return await ProjectService.postProject(payload.data)
    }

    case ProjectRoutes.EDIT_PROJECT: {
      return await ProjectService.editProject(payload.data)
    }

    case ProjectRoutes.REMOVE_PROJECT_BY_ID: {
      return await ProjectService.removeOneProjectByID(payload.data)
    }

    case ProjectRoutes.REMOVE_MANY_PROJECTS_BY_ID: {
      return await ProjectService.removeManyProjectsByID(payload.data)
    }

    case ProjectRoutes.REMOVE_ALL_PROJECTS: {
      return await ProjectService.removeAllProjects()
    }

    default: return {}
  }
}

export class ProjectService {
  static async fetchProjects() {
    return await (await ProjectResolver.Query.fetchProjects({}, {}, {})).data
  }

  static async fetchOneProjectByID(prop: IBasicID) {
    return await (await ProjectResolver.Query.fetchOneProjectByID({}, prop, {})).data
  }

  static async fetchManyProjectsByID(prop: IBasicIDs) {
    return await (await ProjectResolver.Query.fetchManyProjectsByID({}, prop, {})).data
  }

  static async postProject(prop: IPostProject) {
    const foundSector = await SectorService.fetchOneSectorByID({ _id: prop.input.category_sector })
    if (!foundSector._id) return foundSector
    const foundSubSector = await SubSectorService.fetchOneSubSectorByID({ _id: prop.input.category_sub_sector })
    if (!foundSubSector._id) return foundSubSector
    const foundActivity = await ActivityService.fetchOneActivityByID({ _id: prop.input.category_activity })
    if (!foundActivity._id) return foundActivity
    const foundInvestmentActivity = await InvestmentActivityService.fetchOneInvestmentActivityByID({ _id: prop.input.category_investment_activity })
    if (!foundInvestmentActivity._id) return foundInvestmentActivity
    return await (await ProjectResolver.Mutation.postProject({}, prop, {})).data
  }

  static async editProject(prop: IEditProject) {
    if (prop.input.category_sector) {
      const foundSector = await SectorService.fetchOneSectorByID({ _id: prop.input.category_sector })
      if (!foundSector._id) return foundSector
    }
    if (prop.input.category_sub_sector) {
      const foundSubSector = await SubSectorService.fetchOneSubSectorByID({ _id: prop.input.category_sub_sector })
      if (!foundSubSector._id) return foundSubSector
    }
    if (prop.input.category_activity) {
      const foundActivity = await ActivityService.fetchOneActivityByID({ _id: prop.input.category_activity })
      if (!foundActivity._id) return foundActivity
    }
    if (prop.input.category_investment_activity) {
      const foundInvestmentActivity = await InvestmentActivityService.fetchOneInvestmentActivityByID({ _id: prop.input.category_investment_activity })
      if (!foundInvestmentActivity._id) return foundInvestmentActivity
    }
    return await (await ProjectResolver.Mutation.editProject({}, prop, {})).data
  }

  static async removeOneProjectByID(prop: IBasicID) {
    return await (await ProjectResolver.Mutation.removeOneProjectByID({}, prop, {})).data
  }

  static async removeManyProjectsByID(prop: IBasicIDs) {
    return await (await ProjectResolver.Mutation.removeManyProjectsByID({}, prop, {})).data
  }

  static async removeAllProjects() {
    return await (await ProjectResolver.Mutation.removeAllProjects({}, {}, {})).data
  }
}