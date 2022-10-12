import { Role } from "../Common/constants"
import { getAllowedActions as getWorkPermitActions } from "./Schema/WorkPermit/action"
import { getAllowedActions as getRenewWorkPermitActions } from "./Schema/RenewWorkPermit/action"
import { getAllowedActions as getReplaceWorkPermitActions } from "./Schema/ReplaceWorkPermit/action"
import { getAllowedActions as getCancelWorkPermitActions } from "./Schema/CancelWorkPermit/action"
import { getAllowedActions as getEmailActions } from "./Schema/Email/action"

export default (role: Role) => ([
  ...getWorkPermitActions(role), ...getRenewWorkPermitActions(role), ...getReplaceWorkPermitActions(role),
  ...getCancelWorkPermitActions(role), ...getEmailActions(role)
])