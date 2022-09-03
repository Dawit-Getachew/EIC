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

export const CreateInvestmentPermitCancellationBodyTag = "createInvestmentPermitCancellation"
export const CreateInvestmentPermitCancellationBody = (input: {
  investment_id: string, service_id: string, project_status: string[],
  problems_encountered: string, cancellation_document: string,
  has_duty_free: boolean, duty_free_content: string
}) => ({
  query: `mutation {
    createInvestmentPermitCancellation(input: {
      investment_id: "${input.investment_id}"
      service_id: "${input.service_id}"
      project_status: [${input.project_status.map(item => `"${item}"`)}]
      problems_encountered: "${input.problems_encountered}"
      cancellation_document: "${input.cancellation_document}"
      has_duty_free: ${input.has_duty_free}
      duty_free_content: "${input.duty_free_content}"
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