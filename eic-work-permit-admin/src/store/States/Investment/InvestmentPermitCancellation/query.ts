export const UpdateStatusInvestmentPermitCancellationBodyTag = "updateInvestmentPermitCancellation"
export const UpdateStatusInvestmentPermitCancellationBody = (input: {
  _id: string, permit_status: string
}) => ({
  query: `mutation {
    updateInvestmentPermitCancellation(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on IInvestmentPermitCancellationSimple {
        _id
        investment_id
        permit_status
        service_id
        project_status
        problems_encountered
        cancellation_document
        has_duty_free
        duty_free_content
        createdAt
        updatedAt
      }
    }
  }`
})

export const FetchInvestmentPermitCancellationBodyTag = "fetchInvestmentPermitCancellations"
export const FetchInvestmentPermitCancellationBody = () => ({
  query: `{
    fetchInvestmentPermitCancellations {
      _id
      investment_id
      permit_status
      service_id
      project_status
      problems_encountered
      cancellation_document
      has_duty_free
      duty_free_content
      createdAt
      updatedAt
    }
  }`
})