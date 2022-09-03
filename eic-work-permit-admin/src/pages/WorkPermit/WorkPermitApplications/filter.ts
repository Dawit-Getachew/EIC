import { IRoleAccount, InvestmentPermitStatus } from "src/common/enums"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const getActionText = (role: string, status: string) => {
  const new_status = ["SENT_COMPANY_NAME", "APPROVED_COMPANY_NAME",
    "REGISTERED_COMPANY_NAME", "SENT_BANK_SLIP", "ACCEPTED_BANK_SLIP"]
  const foundIndex = new_status.findIndex(item => String(item) === String(status))
  if (foundIndex >= 0) {
    switch (status) {
      case InvestmentPermitStatus.SENT_COMPANY_NAME:
        return "Approve Company Name"

      case InvestmentPermitStatus.SENT_BANK_SLIP:
        return "Approve Bank Slip"
    }
  }

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

export const getPermitChangeStatus = (role: string, status: string) => {
  const new_status = ["SENT_COMPANY_NAME", "APPROVED_COMPANY_NAME",
    "REGISTERED_COMPANY_NAME", "SENT_BANK_SLIP", "ACCEPTED_BANK_SLIP"]
  const foundIndex = new_status.findIndex(item => String(item) === String(status))
  if (foundIndex >= 0) {
    switch (status) {
      case InvestmentPermitStatus.SENT_COMPANY_NAME:
        return InvestmentPermitStatus.APPROVED_COMPANY_NAME

      case InvestmentPermitStatus.SENT_BANK_SLIP:
        return InvestmentPermitStatus.ACCEPTED_BANK_SLIP
    }
  }

  switch (role) {
    case IRoleAccount.INSPECTOR:
      return InvestmentPermitStatus.ACCEPTED

    case IRoleAccount.CASE_WORKER:
      return InvestmentPermitStatus.REVIEWED

    case IRoleAccount.TEAM_LEADER:
      return InvestmentPermitStatus.VERIFIED

    case IRoleAccount.DIRECTOR:
      return InvestmentPermitStatus.APPROVED

    default:
      return InvestmentPermitStatus.ACCEPTED
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
      return InvestmentPermitStatus.APPROVED

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
        item.permit_status === InvestmentPermitStatus.REVIEWED || item.permit_status === InvestmentPermitStatus.VERIFIED ||
        item.permit_status === InvestmentPermitStatus.SENT_COMPANY_NAME || item.permit_status === InvestmentPermitStatus.APPROVED_COMPANY_NAME ||
        item.permit_status === InvestmentPermitStatus.SENT_NEW_COMPANY_NAME || item.permit_status === InvestmentPermitStatus.REGISTERED_COMPANY_NAME ||
        item.permit_status === InvestmentPermitStatus.SENT_BANK_SLIP || item.permit_status === InvestmentPermitStatus.ACCEPTED_BANK_SLIP
      ))
    }

    case IRoleAccount.DIRECTOR: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.VERIFIED || item.permit_status === InvestmentPermitStatus.APPROVED
      ))
    }

    default: {
      return []
    }
  }
}