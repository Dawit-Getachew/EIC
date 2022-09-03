// fetch all notifications
export const fetchUsersSimpleTag = "fetchUsers";

export const fetchUsersBody = () => ({
  query: `{
    fetchUsers {
        _id
        first_name
        middle_name
        last_name
        gender
        role
        phone_number
        email
        service_id
        phone_number
    }
}`
});

export const LogoutBodyTag = "logoutUser"
export const LogoutBody = () => ({
  query: `mutation {
    logoutUser {
      ...on Message {
        message
      }
    }
  }`
})

export const ChangeProfilePictureBodyTag = "updateUser"
export const ChangeProfilePictureBody = (input: {
  _id: string; profile_picture: string;
}) => ({
  query: `mutation{
    updateUser(input: {
      _id: "${input._id}"
      profile_picture: "${input.profile_picture}"
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
        phone_number_type
        country
        city
        profile_picture
        service_id
        createdAt
        updatedAt
      }
    }
  }`
})

export const ChangeUserBasicProfileBodyTag = "updateUser"
export const ChangeUserBasicProfileBody = (input: {
  _id: string; first_name: string; last_name: string;
  gender: string; city: string; country: string;
}) => ({
  query: `mutation{
    updateUser(input: {
      _id: "${input._id}"
      first_name: "${input.first_name}"
      last_name: "${input.last_name}"
      gender: ${input.gender}
      city: "${input.city}"
      country: "${input.country}"
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
        phone_number_type
        country
        city
        profile_picture
        service_id
        createdAt
        updatedAt
      }
    }
  }`
})

export const ChangeUserEmailBodyTag = "changeUserEmail"
export const ChangeUserEmailBody = (input: {
  _id: string; email: string; password: string;
}) => ({
  query: `mutation {
    changeUserEmail(input: {
      _id: "${input._id}"
      email: "${input.email}"
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
        phone_number_type
        country
        city
        profile_picture
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
    }
  }`
})

export const ChangeUserPhoneNumberBodyTag = "changeUserPhoneNumber"
export const ChangeUserPhoneNumberBody = (input: {
  _id: string; phone_number: string; password: string;
}) => ({
  query: `mutation {
    changeUserPhoneNumber(input: {
      _id: "${input._id}"
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
        phone_number_type
        country
        city
        profile_picture
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
    }
  }`
})

export const ChangeUserPasswordBodyTag = "changeUserPassword"
export const ChangeUserPasswordBody = (input: {
  _id: string; old_password: string; new_password: string;
}) => ({
  query: `mutation {
    changeUserPassword(input: {
      _id: "${input._id}"
      old_password: "${input.old_password}"
      new_password: "${input.new_password}"
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
        phone_number_type
        country
        city
        profile_picture
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
    }
  }`
})