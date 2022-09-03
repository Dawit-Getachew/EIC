import { IAccountInput, IAccountEdit } from "./types"

export const FetchAdminsBodyTag = "fetchAccounts"
export const FetchAdminsBody = () => ({
  query: `{
    fetchAccounts {
      _id
      first_name
      middle_name
      last_name
      email
      gender
      role
      phone_number
      service_id
      createdAt
      updatedAt
    }
  }`
})

export const PostAdminBodyTag = "postAccount"
export const PostAdminBody = (input: IAccountInput) => ({
  query: `mutation {
    postAccount(input: {
      first_name: "${input.first_name}"
      last_name: "${input.last_name}"
      email: "${input.email}"
      gender: ${input.gender}
      role: ${input.role}
      phone_number: "${input.phone_number}"
      password: "${input.password}"
    }) {
      ...on IAccountSimple {
        _id
        first_name
        middle_name
        last_name
        email
        gender
        role
        phone_number
        service_id
        createdAt
        updatedAt
      }

      ...on SystemError {
        error_code
        error_message
        error_resource
        error_source
      }
      
      ...on ValidationError {
        errors {
          error_code
          error_message
        }
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

export const EditAdminBodyTag = "updateAccount"
export const EditAdminBody = (input: IAccountEdit) => ({
  query: `mutation {
    updateAccount(input: {
      _id: "${input._id}"
      first_name: "${input.first_name}"
      last_name: "${input.last_name}"
      email: "${input.email}"
      role: ${input.role}
      phone_number: "${input.phone_number}"
    }) {
      ...on IAccountSimple {
        _id
        first_name
        middle_name
        last_name
        email
        gender
        role
        phone_number
        service_id
        createdAt
        updatedAt
      }

      ...on SystemError {
        error_code
        error_message
        error_resource
        error_source
      }
      
      ...on ValidationError {
        errors {
          error_code
          error_message
        }
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

export const RemoveAdminBodyTag = "removeOneAccount"
export const RemoveAdminBody = (_id: string) => ({
  query: `mutation {
    removeOneAccount(_id: "${_id}") {
      _id
    }
  }`
})