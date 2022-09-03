import { getGQLDate } from '../../../utils/date'

export const UpdateStatusInvestmentPermitRenewalBodyTag = "updateInvestmentPermitRenewal"
export const UpdateStatusInvestmentPermitRenewalBody = (input: {
  _id: string, permit_status: string
}) => ({
  query: `mutation {
    updateInvestmentPermitRenewal(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on IInvestmentPermitRenewalSimple {
        _id
        investment_id
        permit_status
        service_id
        createdAt
        updatedAt
      }
    }
  }`
})

export const FetchInvestmentPermitRenewalBodyTag = "fetchInvestmentPermitRenewals"
export const FetchInvestmentPermitRenewalBody = () => ({
  query: `{
    fetchInvestmentPermitRenewals {
      _id
      investment_id
      project_status
      problems_encountered
      date_of_commencement
      permit_status
      service_id
      createdAt
      updatedAt
    }
  }`
})

export const CreateInvestmentPermitRenewalBodyTag = "createInvestmentPermitRenewal"
export const CreateInvestmentPermitRenewalBody = (input: {
  investment_id: string, service_id: string,
  project_status: string[], problems_encountered: string, date_of_commencement: string
}) => ({
  query: `mutation {
    createInvestmentPermitRenewal(input: {
      investment_id: "${input.investment_id}"
      service_id: "${input.service_id}"
      project_status: [${input.project_status.map(item => `"${item}"`)}]
      problems_encountered: "${input.problems_encountered}"
      date_of_commencement: "${getGQLDate(new Date(input.date_of_commencement), false)}"
    }) {
      ...on IInvestmentPermitRenewalSimple {
        _id
        investment_id
        project_status
        problems_encountered
        date_of_commencement
        service_id
        permit_status
        createdAt
        updatedAt
      }
    }
  }`
})