import { Role } from "../Common/constants"
import { getAllowedActions as getUserActions } from "./Schema/User/action"
import { getAllowedActions as getAccountActions } from "./Schema/Account/action"
import { getAllowedActions as getSectorActions } from "./Schema/Category/Sector/action"
import { getAllowedActions as getSubSectorActions } from "./Schema/Category/SubSector/action"
import { getAllowedActions as getActivityActions } from "./Schema/Category/Activity/action"
import { getAllowedActions as getInvestmentActivityActions } from "./Schema/Category/InvestmentActivity/action"
import { getAllowedActions as getManagerActions } from "./Schema/Manager/action"
import { getAllowedActions as getProductActions } from "./Schema/Product/action"
import { getAllowedActions as getProjectActions } from "./Schema/Project/action"
import { getAllowedActions as getWorkPermitActions } from "./Schema/WorkPermit/action"
import { getAllowedActions as getMessageActions } from "./Schema/Message/action"
import { getAllowedActions as getInvestmentPermitActions } from "./Schema/InvestmentPermit/action"
import { getAllowedActions as getInvestmentPermitRenewalActions } from "./Schema/InvestmentPermitRenewal/action"
import { getAllowedActions as getInvestmentPermitExpansionActions } from "./Schema/InvestmentPermitExpansion/action"
import { getAllowedActions as getInvestmentPermitCancellationActions } from "./Schema/InvestmentPermitCancellation/action"
import { getAllowedActions as getInvestmentPermitAmmendmentActions } from "./Schema/InvestmentPermitAmmendment/action"
import { getAllowedActions as getEmailActions } from "./Schema/Email/action"


export default (role: Role) => ([
  ...getUserActions(role), ...getAccountActions(role),
  ...getSectorActions(role), ...getSubSectorActions(role), ...getActivityActions(role),
  ...getInvestmentActivityActions(role), ...getManagerActions(role), ...getProductActions(role),
  ...getProjectActions(role), ...getWorkPermitActions(role), ...getMessageActions(role),
  ...getInvestmentPermitActions(role), ...getInvestmentPermitRenewalActions(role),
  ...getInvestmentPermitExpansionActions(role), ...getInvestmentPermitCancellationActions(role),
  ...getInvestmentPermitAmmendmentActions(role), ...getEmailActions(role)
])