import { combineReducers } from "redux";
import { reducer as UserInfoReducer, stateName as user_info } from "./States/Auth";
import { reducer as BufferReducer, stateName as buffer } from "./States/Buffer";
import { AuthReducer, stateName as auth } from "./States/Auth/reducer";
import { reducer as InvestmentPermitReducer, stateName as investment_permit } from "./States/InvestmentPermit/";
import { reducer as InvestmentPermitRenewalReducer, stateName as investment_permit_renewal } from "./States/InvestmentPermitRenewal";
import { reducer as InvestmentPermitExpansionReducer, stateName as investment_permit_expansion } from "./States/InvestmentPermitExpansion";
import { reducer as InvestmentPermitCancellationReducer, stateName as investment_permit_cancellation } from "./States/InvestmentPermitCancellation";
import { reducer as InvestmentPermitAmmendmentReducer, stateName as investment_permit_ammendment } from "./States/InvestmentPermitAmmendment";
import { reducer as NotificationReducer, stateName as notification } from "./States/Notification";

// NEW
import { reducer as WorkPermitReducer, stateName as work_permit } from "./States/WorkPermit";

export default combineReducers({
  [user_info]: UserInfoReducer,
  [auth]: AuthReducer,
  [buffer]: BufferReducer,
  [investment_permit]: InvestmentPermitReducer,
  [investment_permit_expansion]: InvestmentPermitExpansionReducer,
  [investment_permit_cancellation]: InvestmentPermitCancellationReducer,
  [investment_permit_renewal]: InvestmentPermitRenewalReducer,
  [notification]: NotificationReducer,
  [investment_permit_ammendment]: InvestmentPermitAmmendmentReducer,
  [work_permit]: WorkPermitReducer
})