/* eslint-disable*/
import { IRenewWorkPermitInput } from "./types"

const getValue = (value: any) => {
  return value? value : ""
}

export const CreateRenewWorkPermitBodyTag = "createRenewWorkPermit"
export const CreateRenewWorkPermitBody = (input: IRenewWorkPermitInput) => ({
  query: `mutation {
    createRenewWorkPermit(input: {
      work_permit_id: "${input.work_permit_id}"
      tranining_document: "${input.tranining_document}"
      service_id: "${input.service_id}"
    }) {
      ...on IRenewWorkPermitSimple {
        _id
        work_permit_id
        tranining_document
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
      
      ...on ValidationError {
        errors {
          error_code
          error_message
        }
        error_path
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

export const UpdateRenewWorkPermitBodyTag = "updateRenewWorkPermit"
export const UpdateRenewWorkPermitBody = (input: {
  _id: string; permit_status: string
}) => ({
  query: `mutation {
    updateRenewWorkPermit(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on IRenewWorkPermitSimple {
        _id
        work_permit_id
        tranining_document
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
      
      ...on ValidationError {
        errors {
          error_code
          error_message
        }
        error_path
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

export const FetchRenewWorkPermitsBodyTag = "fetchRenewWorkPermits"
export const FetchRenewWorkPermitsBody = () => ({
  query: `{
    fetchRenewWorkPermits {
      _id
      tranining_document
      work_permit_id
      service_id
      permit_status
      createdAt
      updatedAt
    }
  }`
})