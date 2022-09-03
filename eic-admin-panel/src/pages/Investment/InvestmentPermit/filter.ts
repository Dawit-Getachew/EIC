import { IRoleAccount, InvestmentPermitStatus } from "src/common/enums"

export const getActionText = (role: string, status: string) => {
  const new_status = ["SENT_COMPANY_NAME", "APPROVED_COMPANY_NAME",
    "REGISTERED_COMPANY_NAME", "SENT_BANK_SLIP", "ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP"]
  const foundIndex = new_status.findIndex(item => String(item) === String(status))
  if (foundIndex >= 0) {
    switch (status) {
      case InvestmentPermitStatus.SENT_COMPANY_NAME:
        return "Approve Company Name"

      case InvestmentPermitStatus.SENT_COMPANY_REGISTRATION_BANK_SLIP:
        return "Approve Company Registration Bank Slip"
      case InvestmentPermitStatus.SENT_MEMORANDUM_BANK_SLIP:
        return "Approve Memorandum of Articles & Assoc. Bank Slip"
      case InvestmentPermitStatus.SENT_CREDIT_SERVICE_BANK_SLIP:
        return "Approve Credit Service Bank Slip"
      case InvestmentPermitStatus.SENT_SERVICE_FEE_BANK_SLIP:
        return "Approve Service Fee Bank Slip"
    }
  }

  switch (role) {
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
  const new_status = [
    InvestmentPermitStatus.SENT_COMPANY_NAME, InvestmentPermitStatus.APPROVED_COMPANY_NAME, InvestmentPermitStatus.SENT_MEMORANDUM_OF_ARTICLES,
    InvestmentPermitStatus.REGISTERED_COMPANY_NAME, InvestmentPermitStatus.SENT_COMPANY_REGISTRATION_BANK_SLIP, InvestmentPermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP,
    InvestmentPermitStatus.SENT_MEMORANDUM_BANK_SLIP, InvestmentPermitStatus.SENT_CREDIT_SERVICE_BANK_SLIP,
    InvestmentPermitStatus.SENT_SERVICE_FEE_BANK_SLIP, InvestmentPermitStatus.REGISTERED_TIN_NUMBER
  ]
  const foundIndex = new_status.findIndex(item => String(item) === String(status))
  if (foundIndex >= 0) {
    switch (status) {
      case InvestmentPermitStatus.SENT_COMPANY_NAME:
        return InvestmentPermitStatus.REGISTERED_COMPANY_NAME

      case InvestmentPermitStatus.SENT_COMPANY_REGISTRATION_BANK_SLIP:
        return InvestmentPermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP

      case InvestmentPermitStatus.SENT_MEMORANDUM_OF_ARTICLES:
        return InvestmentPermitStatus.ACCEPTED_MEMORANDUM_OF_ARTICLES

      case InvestmentPermitStatus.SENT_MEMORANDUM_BANK_SLIP:
        return InvestmentPermitStatus.ACCEPTED_MEMORANDUM_BANK_SLIP

      case InvestmentPermitStatus.SENT_CREDIT_SERVICE_BANK_SLIP:
        return InvestmentPermitStatus.ACCEPTED_CREDIT_SERVICE_BANK_SLIP
        
      case InvestmentPermitStatus.SENT_SERVICE_FEE_BANK_SLIP:
        return InvestmentPermitStatus.ACCEPTED_SERVICE_FEE_BANK_SLIP
    }
  }

  switch (role) {
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
    case IRoleAccount.CASE_WORKER: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.ACCEPTED || item.permit_status === InvestmentPermitStatus.REVIEWED
        || item.permit_status === InvestmentPermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP
      ))
    }

    case IRoleAccount.TEAM_LEADER: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.REVIEWED || item.permit_status === InvestmentPermitStatus.VERIFIED ||
        item.permit_status === InvestmentPermitStatus.SENT_COMPANY_NAME || item.permit_status === InvestmentPermitStatus.APPROVED_COMPANY_NAME ||
        item.permit_status === InvestmentPermitStatus.SENT_NEW_COMPANY_NAME || item.permit_status === InvestmentPermitStatus.REGISTERED_COMPANY_NAME ||
        item.permit_status === InvestmentPermitStatus.SENT_MEMORANDUM_OF_ARTICLES || item.permit_status === InvestmentPermitStatus.ACCEPTED_MEMORANDUM_OF_ARTICLES || item.permit_status === InvestmentPermitStatus.SENT_COMPANY_REGISTRATION_BANK_SLIP ||
        item.permit_status === InvestmentPermitStatus.SENT_MEMORANDUM_BANK_SLIP || item.permit_status === InvestmentPermitStatus.ACCEPTED_MEMORANDUM_BANK_SLIP ||
        item.permit_status === InvestmentPermitStatus.SENT_CREDIT_SERVICE_BANK_SLIP || item.permit_status === InvestmentPermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP ||
        item.permit_status === InvestmentPermitStatus.ACCEPTED_CREDIT_SERVICE_BANK_SLIP || item.permit_status === InvestmentPermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP ||
        item.permit_status === InvestmentPermitStatus.SENT_SERVICE_FEE_BANK_SLIP || item.permit_status === InvestmentPermitStatus.ACCEPTED_SERVICE_FEE_BANK_SLIP ||
        item.permit_status === InvestmentPermitStatus.REGISTERED_TIN_NUMBER
      ))
    }

    case IRoleAccount.DIRECTOR: {
      return permits.filter(item => (
        item.permit_status === InvestmentPermitStatus.VERIFIED || item.permit_status === InvestmentPermitStatus.APPROVED
        || item.permit_status === InvestmentPermitStatus.ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP
      ))
    }

    default: {
      return []
    }
  }
}