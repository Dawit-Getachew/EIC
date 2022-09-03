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
        project_status
        problems_encountered
        date_of_commencement
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
      project_status
      problems_encountered
      date_of_commencement
      investment_id
      permit_status
      service_id
      createdAt
      updatedAt
    }
  }`
})