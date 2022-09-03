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

export const FetchFullNameUserBodyTag = "fetchUserByServiceID"
export const FetchFullNameUserBody = (_id: string) => ({
  query: `{
    fetchUserByServiceID(_id: "${_id}") {
      first_name
      middle_name
      last_name
    }
  }`
})