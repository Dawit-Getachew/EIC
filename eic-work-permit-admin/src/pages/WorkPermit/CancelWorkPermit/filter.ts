import { IRoleAccount, } from "src/common/enums"
import { PermitStatus } from "src/store/States/WorkPermit/WorkPermitApplications/types"

export const getActionText = (role: string) => {
  switch (role) {
    case IRoleAccount.INSPECTOR:
      return "Accept Permit"

    case IRoleAccount.CASE_WORKER:
      return "Review Permit"

    case IRoleAccount.TEAM_LEADER:
      return "Verify Permit"

    case IRoleAccount.DIRECTOR:
      return "Approve Permit"

    default:
      return ""
  }
}

export const getCancelPermitStatus = (role: string) => {
  switch (role) {
    case IRoleAccount.TEAM_LEADER:
      return PermitStatus.VERIFIED

    case IRoleAccount.DIRECTOR:
      return PermitStatus.RENEWED

    default:
      return PermitStatus.VERIFIED
  }
}

export const getPermitStatus = (role: string) => {
  switch (role) {
    case IRoleAccount.CASE_WORKER:
      return PermitStatus.REVIEWED

    case IRoleAccount.TEAM_LEADER:
      return PermitStatus.VERIFIED

    case IRoleAccount.DIRECTOR:
      return PermitStatus.APPROVED

    default:
      return PermitStatus.REVIEWED
  }
}

export const filterPermits = (role: string, permits: any[]) => {
  switch (role) {
    case IRoleAccount.TEAM_LEADER: {
      return permits.filter(item => (
        item.permit_status === PermitStatus.DRAFTED || item.permit_status === PermitStatus.REVIEWED || item.permit_status === PermitStatus.VERIFIED
      ))
    }

    case IRoleAccount.DIRECTOR: {
      return permits.filter(item => (
        item.permit_status === PermitStatus.VERIFIED || item.permit_status === PermitStatus.APPROVED
      ))
    }

    default: {
      return []
    }
  }
}

export const filterCancellationPermits = (role: string, permits: any[]) => {
  switch (role) {
    case IRoleAccount.TEAM_LEADER: {
      return permits.filter(item => (
        item.permit_status === PermitStatus.REVIEWED || item.permit_status === PermitStatus.VERIFIED
      ))
    }

    case IRoleAccount.DIRECTOR: {
      return permits.filter(item => (
        item.permit_status === PermitStatus.VERIFIED || item.permit_status === PermitStatus.RENEWED
      ))
    }

    default: {
      return []
    }
  }
}