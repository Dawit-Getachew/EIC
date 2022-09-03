export const FetchReplaceWorkPermitsBodyTag = "fetchReplaceWorkPermits"
export const FetchReplaceWorkPermitsBody = () => ({
  query: `{
    fetchReplaceWorkPermits {
      _id
      work_permit_id
      reason_type
      police_report
      passport_image
      damaged_permit
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
export const UpdateRepalceWorkPermitStatusBodyTag = "updateReplaceWorkPermit"
export const UpdateRepalceWorkPermitStatusBody = (input: IUpdatePermitStatus) => ({
  query: `mutation {
    updateReplaceWorkPermit(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on IReplaceWorkPermitSimple {
        _id
        work_permit_id
        reason_type
        police_report
        passport_image
        damaged_permit
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