// fetch all notifications
export const FetchUsersBodyTag = "fetchUsers";

export const FetchUsersBody = () => ({
  query: `{
    fetchUsers {
      _id
      service_id
      first_name
      middle_name
      last_name
      email
      gender
      role
      phone_number
      createdAt
      updatedAt
    }
  }`
});

export const FetchUserInfoBySessionBodyTag = "fetchUserInfoBySession"
export const FetchUserInfoBySessionBody = () => ({
  query: `{
    fetchUserInfoBySession {
      _id
      first_name
      middle_name
      last_name
      email
      role
      service_id
    }
  }`
})

export const FetchAccountsBodyTag = "fetchAccounts"
export const FetchAccountsBody = () => ({
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

export interface IPostAccountInput {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  gender: string;
  role: string;
  phone_number: string;
  password: string;
}
export const PostAccountBodyTag = "postAccount"
export const PostAccountBody = (input: IPostAccountInput) => ({
  query: `mutation {
    postAccount(input: {
      first_name: "${input.first_name}"
      middle_name: "${input.middle_name}"
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

export interface IEditAccountInput {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone_number: string;
}
export const EditAccountBodyTag = "updateAccount"
export const EditAccountBody = (input: IEditAccountInput) => ({
  query: `mutation {
    updateAccount(input: {
      _id: "${input._id}"
      first_name: "${input.first_name}"
      last_name: "${input.last_name}"
      email: "${input.email}"
      phone_number: "${input.phone_number}"
      role: ${input.role}
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
      
      ...on SystemError {
        error_code
        error_message
        error_resource
      }
    }
  }`
})

export const FetchEmailByServiceIDBodyTag = "fetchUserByServiceID"
export const FetchEmailByServiceIDBody = (_id: string) => ({
  query: `{
    fetchUserByServiceID(_id: "${_id}") {
      _id
      email
    }
  }`
})

export interface IEmailInput {
  emailAddress: string;
  subject: string;
  html: string;
}

export const SendEmailBodyTag = "sendEmail"
export const SendEmailBody = (input: IEmailInput) => ({
  query: `mutation {
    sendEmail(input: {
      emailAddress: "${input.emailAddress}"
      subject: "${input.subject}"
      html: "${input.html}"
    }) {
      accepted
      rejected
      envelopeTime
      messageTime
      messageSize
      response
      messageId
    }
  }`
})