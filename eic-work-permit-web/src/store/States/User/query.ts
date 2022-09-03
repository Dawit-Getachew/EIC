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