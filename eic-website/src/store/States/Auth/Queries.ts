import { ILoginAccountInput, IUserInput, IUserEdit, IUserDoc, ILoginUserInput } from "./user.types"

export type { IUserInput, ILoginAccountInput, ILoginUserInput, IUserEdit, IUserDoc }

export const SignUpTag = "IAccountSimple"
export const SignUpBody = (input: IUserInput) => ({
  query: `mutation {
    signUpAccount(input: {
        first_name: "${input.first_name}"
        middle_name: "${input.middle_name}"
        email: "${input.email}"
        last_name: "${input.last_name}"
        gender: ${input.gender}
        role: ${input.role}
        phone_number: "${input.phone_number}"
        password: "${input.password}"
    }) {
        ...on IAccountSimple {
          _id
          first_name
          middle_name
          email
          last_name
          gender
          role
          phone_number
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

        ...on SystemError {
          error_code
          error_message
        }

        ...on ValidationErrors {
          validation_errors {
            error_path
            errors {
              error_code
              error_message
            }
          }
        }
    }
  }`
})

export const SignupUserBodyTag = "signUpUser"
export const SignupUserBody = (input: IUserInput) => ({
  query: `mutation {
    signUpUser(input: {
      first_name: "${input.first_name}"
      middle_name: "${input.middle_name}"
      last_name: "${input.last_name}"
      email: "${input.email}"
      gender: ${input.gender}
      role: ${input.role}
      phone_number: "${input.phone_number}"
      password: "${input.password}"
    }) {
      ...on IUserSimple {
        _id
        first_name
        middle_name
        last_name
        email
        gender
        role
        phone_number
        service_id
        updatedAt
        createdAt
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

export const LoginUserBodyTag = "loginUser"
export const LoginUserBody = (input: ILoginUserInput) => ({
  query: `mutation {
    loginUser(input: {
      phone_number: "${input.phone_number}"
      password: "${input.password}"
    }) {
     ...on IUserSimple {
        _id
        first_name
        middle_name
        last_name
        email
        gender
        role
        phone_number
        service_id
        updatedAt
        createdAt
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

export const LoginTag = "loginAccount"
export const LoginAccountBody = ({ email, password }: ILoginAccountInput) => ({
  query: `mutation {
    loginAccount(input:{email: "${email}", password: "${password}"}) {
      __typename
      ... on IAccountSimple{
          _id first_name last_name email phone_number role service_id
       }
      ... on ValidationErrors {
        validation_errors {
          error_path errors {
            error_message error_code
          }
        }
      }
      ... on ValidationError {
        error_path errors {
          error_code error_message
        }
      }
    }
  }`
});

export const SignOutTag = "signOut";

export const SignOutBody = () => ({
  query: `mutation {
    logoutAccount {
      ...on UnAuthenticatedError {
        error_message
        status
      }

      ...on Message {
        message
      }
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
      gender
      role
      phone_number
      phone_number_type
      country
      city
      profile_picture
      service_id
      createdAt
      updatedAt
    }
  }`
})

export const ActivateUserDetailBody = (_id: string) => ({
  query: `mutation {
    editUser(input: {
        _id: "${_id}",
        hasUserDetail: true
    }) {
        _id
        hasUserDetail
    }
}`
})

export const EditTag = "editUser"

export const EditUserBody = (input: IUserEdit) => ({
  query: `mutation {
    editUser(input: {
      _id: "${input._id}",
      name: "${input.name}",
      email: "${input.email}",
      phoneNumber: "${input.phoneNumber}",
      password: "${input.password}"
    }) {
      _id
      name
      phoneNumber
      email
      password
      userType
      hasUserDetail
      error {
        type
        message
      }
      createdAt
      updatedAt
      }
    }`
})

export const FetchUserCountBody = () => ({
  query: `{
    fetchUserCount
  }`
})

export const FetchUserCountTag = "fetchUserCount"


export const SendTextBody = (phoneNumber: string) => ({
  query: `mutation {
    sendText(
      username: "AC261f71f93af91490b74344b5f1530ced",
      password: "a2814971b46ccb2eaaf79de5ddf70f9b",
      serviceID: "VA3681b48f0c64f46434bfa1c6146e9e48",
      phoneNumber: "${phoneNumber}"
    ) {
      message
      error {
        value
        message
      }
    }
  }`
})

export const SendTextTag = "sendText"


export const VerifyBody = (phoneNumber: string, code: string) => ({
  query: `mutation {
    verify(
      username: "AC261f71f93af91490b74344b5f1530ced",
      password: "a2814971b46ccb2eaaf79de5ddf70f9b",
      serviceID: "VA3681b48f0c64f46434bfa1c6146e9e48",
      phoneNumber: "${phoneNumber}"
      code: "${code}"
    ) {
      message
      error {
        value
        message
      }
    }
  }`
})

export const VerifyTag = "verify"

