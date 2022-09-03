import { combineReducers } from "redux";
import { reducer as UserInfoReducer, stateName as user_info } from "./States/Auth";
import { reducer as BufferReducer, stateName as buffer } from "./States/Buffer";
import { AuthReducer, stateName as auth } from "./States/Auth/reducer";
import { reducer as BusinessProfileReducer, stateName as business_profile } from './States/Investment/BusinessProfile/'
import { reducer as ManagerReducer, stateName as manager } from './States/Investment/Manager/'
import { reducer as WorkPermitReducer, stateName as work_permit } from './States/Investment/WorkPermit/'
import { reducer as ProjectReducer, stateName as project } from './States/Investment/Project/'
import { reducer as SectorReducer, stateName as sector } from './States/Investment/Category/Sector'
import { reducer as SubSectorReducer, stateName as sub_sector } from './States/Investment/Category/SubSector'
import { reducer as ActivityReducer, stateName as activity } from './States/Investment/Category/Activity'
import { reducer as InvestmentActivityReducer, stateName as investment_activity } from './States/Investment/Category/InvestmentActivity'
import { reducer as ProductReducer, stateName as product } from './States/Investment/Product'
import { reducer as MessageReducer, stateName as message } from './States/Investment/Message'
import { reducer as UserReducer, stateName as user } from './States/Investment/User'
import { reducer as AccountReducer, stateName as account } from './States/Investment/Account'
import { reducer as InvestmentPermitReducer, stateName as investment_permit } from './States/Investment/InvestmentPermit/'
import { reducer as InvestmentPermitRenewalReducer, stateName as investment_permit_renewal } from './States/Investment/InvestmentPermitRenewal/'
import { reducer as InvestmentPermitExpansionReducer, stateName as investment_permit_expansion } from './States/Investment/InvestmentPermitExpansion/'
import { reducer as InvestmentPermitCancellationReducer, stateName as investment_permit_cancellation } from './States/Investment/InvestmentPermitCancellation/'
import { reducer as InvestmentPermitAmmendmentReducer, stateName as investment_permit_ammendment } from './States/Investment/InvestmentPermitAmmendment/'
import { reducer as AdminReducer, stateName as admin } from './States/Admin/'

export default combineReducers({
  [user_info]: UserInfoReducer,
  [auth]: AuthReducer,
  [buffer]: BufferReducer,
  [business_profile]: BusinessProfileReducer,
  [manager]: ManagerReducer,
  [work_permit]: WorkPermitReducer,
  [project]: ProjectReducer,
  [sector]: SectorReducer,
  [sub_sector]: SubSectorReducer,
  [activity]: ActivityReducer,
  [investment_activity]: InvestmentActivityReducer,
  [product]: ProductReducer,
  [message]: MessageReducer,
  [user]: UserReducer,
  [account]: AccountReducer,
  [investment_permit]: InvestmentPermitReducer,
  [investment_permit_renewal]: InvestmentPermitRenewalReducer,
  [investment_permit_expansion]: InvestmentPermitExpansionReducer,
  [investment_permit_cancellation]: InvestmentPermitCancellationReducer,
  [investment_permit_ammendment]: InvestmentPermitAmmendmentReducer,
  [admin]: AdminReducer
})