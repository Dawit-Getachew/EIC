export const FetchCancelWorkPermitsBodyTag = "fetchCancelWorkPermits"
export const FetchCancelWorkPermitsBody = () => ({
  query: `{
    fetchCancelWorkPermits {
      _id
      work_permit_id
      reason_type
      service_id
      permit_status
      createdAt
      updatedAt
    }
  }`
})

export interface IUpdatePermitStatus {
  _id: string;
  permit_status: string;
}
export const UpdateCancelWorkPermitStatusBodyTag = "updateCancelWorkPermit"
export const UpdateCancelWorkPermitStatusBody = (input: IUpdatePermitStatus) => ({
  query: `mutation {
    updateCancelWorkPermit(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on ICancelWorkPermitSimple {
        _id
        work_permit_id
        reason_type
        service_id
        permit_status
        createdAt
        updatedAt
      }
      
      ...on SystemError {
        error_code
        error_message
        error_resource
      }
      
      ...on ValidationErrors {
        validation_errors {
          errors {
            error_code
            error_message
          }
          error_path
        }
      }
    }
  }`
})