import { IRoleAccount, InvestmentPermitStatus } from "src/common/enums"

export const getActionText = (role: string) => {
  switch (role) {
    case IRoleAccount.INSPECTOR:
      return "Accept Permit"

    case IRoleAccount.CASE_WORKER:
      return "Review Permit"

    case IRoleAccount.TEAM_LEADER:
      return "Verify Permit"

    case IRoleAccount.DIRECTOR:
      return "Cancel Permit"

    default:
      return ""
  }
}

export const getCancelPermitStatus = (role: string) => {
  switch (role) {
    case IRoleAccount.TEAM_LEADER:
      return InvestmentPermitStatus.VERIFIED

    case IRoleAccount.DIRECTOR:
      return InvestmentPermitStatus.CANCELLED

    default:
      return InvestmentPermitStatus.VERIFIED
  }
}

export const getPermitStatus = (role: string) => {
  switch (role) {
    case IRoleAccount.INSPECTOR:
      return InvestmentPermitStatus.ACCEPTED

    case IRoleAccount.CASE_WORKER:
      return InvestmentPermitStatus.REVIEWED

    case IRoleAccount.TEAM_LEADER:
      return InvestmentPermitStatus.VERIFIED

    case IRoleAccount.DIRECTOR:
      return InvestmentPermitStatus.CANCELLED

    default:
      return InvestmentPermitStatus.ACCEPTED
  }
}

export const filterPermits = (role: string, permits: any[]) => {
  switch (role) {
    case IRoleAccount.INSPECTOR: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.DRAFTED || item.permit_status === InvestmentPermitStatus.ACCEPTED
      ))
    }

    case IRoleAccount.CASE_WORKER: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.ACCEPTED || item.permit_status === InvestmentPermitStatus.REVIEWED
      ))
    }

    case IRoleAccount.TEAM_LEADER: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.REVIEWED || item.permit_status === InvestmentPermitStatus.VERIFIED
      ))
    }

    case IRoleAccount.DIRECTOR: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.VERIFIED || item.permit_status === InvestmentPermitStatus.CANCELLED
      ))
    }

    default: {
      return []
    }
  }
}

export const filterCancelalPermits = (role: string, permits: any[]) => {
  switch (role) {
    case IRoleAccount.INSPECTOR: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.DRAFTED || item.permit_status === InvestmentPermitStatus.ACCEPTED
      ))
    }

    case IRoleAccount.CASE_WORKER: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.ACCEPTED || item.permit_status === InvestmentPermitStatus.REVIEWED
      ))
    }

    case IRoleAccount.TEAM_LEADER: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.REVIEWED || item.permit_status === InvestmentPermitStatus.VERIFIED
      ))
    }

    case IRoleAccount.DIRECTOR: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.VERIFIED || item.permit_status === InvestmentPermitStatus.CANCELLED
      ))
    }

    default: {
      return []
    }
  }
}