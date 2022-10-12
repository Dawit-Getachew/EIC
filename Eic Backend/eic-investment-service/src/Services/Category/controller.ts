import {
  ActivityRoutes, InvestmentActivityRoutes, SectorRoutes, SubSectorRoutes
} from "../../Common/routes"
import { IRabbitMQServerMessage } from "../../Common/interface"
import SectorService from "./Sector"
import SubSectorService from "./SubSector"
import ActivityService from "./Activity"
import InvestmentActivityService from "./InvestmentActivity"

export const CategoryController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case SectorRoutes.GET_ALL_SECTORS: {
      return await SectorService.fetchSectors()
    }

    case SectorRoutes.GET_ONE_SECTOR: {
      return await SectorService.fetchOneSectorByID(payload.data)
    }

    case SectorRoutes.GET_MANY_SECTORS_BY_ID: {
      return await SectorService.fetchManySectorsByID(payload.data)
    }

    case SectorRoutes.POST_SECTOR: {
      return await SectorService.postSector(payload.data)
    }

    case SectorRoutes.EDIT_SECTOR: {
      return await SectorService.editSector(payload.data)
    }

    case SectorRoutes.REMOVE_SECTOR_BY_ID: {
      return await SectorService.removeOneSectorByID(payload.data)
    }

    case SectorRoutes.REMOVE_MANY_SECTORS_BY_ID: {
      return await SectorService.removeManySectorsByID(payload.data)
    }

    case SectorRoutes.REMOVE_ALL_SECTORS: {
      return await SectorService.removeAllSectors()
    }

    case SubSectorRoutes.GET_ALL_SUB_SECTORS: {
      return await SubSectorService.fetchSubSectors()
    }

    case SubSectorRoutes.GET_ONE_SUB_SECTOR: {
      return await SubSectorService.fetchOneSubSectorByID(payload.data)
    }

    case SubSectorRoutes.GET_MANY_SUB_SECTORS_BY_ID: {
      return await SubSectorService.fetchManySubSectorsByID(payload.data)
    }

    case SubSectorRoutes.POST_SUB_SECTOR: {
      return await SubSectorService.postSubSector(payload.data)
    }

    case SubSectorRoutes.EDIT_SUB_SECTOR: {
      return await SubSectorService.editSubSector(payload.data)
    }

    case SubSectorRoutes.REMOVE_SUB_SECTOR_BY_ID: {
      return await SubSectorService.removeOneSubSectorByID(payload.data)
    }

    case SubSectorRoutes.REMOVE_MANY_SUB_SECTORS_BY_ID: {
      return await SubSectorService.removeManySubSectorsByID(payload.data)
    }

    case SubSectorRoutes.REMOVE_ALL_SUB_SECTORS: {
      return await SubSectorService.removeAllSubSectors()
    }

    case ActivityRoutes.GET_ALL_ACTIVITIES: {
      return await ActivityService.fetchActivities()
    }

    case ActivityRoutes.GET_ONE_ACTIVITY: {
      return await ActivityService.fetchOneActivityByID(payload.data)
    }

    case ActivityRoutes.GET_MANY_ACTIVITIES_BY_ID: {
      return await ActivityService.fetchManyActivitiesByID(payload.data)
    }

    case ActivityRoutes.POST_ACTIVITY: {
      return await ActivityService.postActivity(payload.data)
    }

    case ActivityRoutes.EDIT_ACTIVITY: {
      return await ActivityService.editActivity(payload.data)
    }

    case ActivityRoutes.REMOVE_ACTIVITY_BY_ID: {
      return await ActivityService.removeOneActivityByID(payload.data)
    }

    case ActivityRoutes.REMOVE_MANY_ACTIVITIES_BY_ID: {
      return await ActivityService.removeManyActivitiesByID(payload.data)
    }

    case ActivityRoutes.REMOVE_ALL_ACTIVITIES: {
      return await ActivityService.removeAllActivities()
    }

    case InvestmentActivityRoutes.GET_ALL_INVESTMENT_ACTIVITIES: {
      return await InvestmentActivityService.fetchInvestmentActivities()
    }

    case InvestmentActivityRoutes.GET_ONE_INVESTMENT_ACTIVITY: {
      return await InvestmentActivityService.fetchOneInvestmentActivityByID(payload.data)
    }

    case InvestmentActivityRoutes.GET_MANY_INVESTMENT_ACTIVITIES_BY_ID: {
      return await InvestmentActivityService.fetchManyInvestmentActivitiesByID(payload.data)
    }

    case InvestmentActivityRoutes.POST_INVESTMENT_ACTIVITY: {
      return await InvestmentActivityService.postInvestmentActivity(payload.data)
    }

    case InvestmentActivityRoutes.EDIT_INVESTMENT_ACTIVITY: {
      return await InvestmentActivityService.editInvestmentActivity(payload.data)
    }

    case InvestmentActivityRoutes.REMOVE_INVESTMENT_ACTIVITY_BY_ID: {
      return await InvestmentActivityService.removeOneInvestmentActivityByID(payload.data)
    }

    case InvestmentActivityRoutes.REMOVE_MANY_INVESTMENT_ACTIVITIES_BY_ID: {
      return await InvestmentActivityService.removeManyInvestmentActivitiesByID(payload.data)
    }

    case InvestmentActivityRoutes.REMOVE_ALL_INVESTMENT_ACTIVITIES: {
      return await InvestmentActivityService.removeAllInvestmentActivities()
    }

    default: return {}
  }
}