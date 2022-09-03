export const UpdateStatusNotificationBodyTag = "updateNotification"
export const UpdateStatusNotificationBody = (input: {
  _id: string
}) => ({
  query: `mutation {
    updateNotification(input: {
      _id: "${input._id}"
      is_read: true
    }) {
      ...on INotificationSimple {
        _id
        title
        description
        icon
        service_id
        is_read
        createdAt
        updatedAt
      }
    }
  }`
})

export const FetchNotificationBodyTag = "fetchNotifications"
export const FetchNotificationBody = () => ({
  query: `{
    fetchNotifications {
      _id
      title
      description
      icon
      service_id
      is_read
      createdAt
      updatedAt
    }
  }`
})

export const CreateNotificationBodyTag = "createNotification"
export const CreateNotificationBody = (_: any) => ({
  query: `mutation {
  createNotification(input: {
    title: "SOME"
    description: "AAA"
    icon: SUCCESS
    service_id: "0.4565537232441088"
  }) {
    ...on INotificationSimple {
      _id
      title
      description
      icon
      service_id
      is_read
      createdAt
      updatedAt
    }
  }
}`
})