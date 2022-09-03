import { IActivityEdit, IActivityInput } from "src/models/InvestmentModels/Category/activity"

export const FetchActivitiesBodyTag = "fetchActivities"
export const FetchActivitiesBody = () => ({
  query: `{
    fetchActivities {
      _id
      name
      sub_sector
      createdAt
      updatedAt
    }
  }`
})

export const CreateActivityBodyTag = "createActivity"
export const CreateActivityBody = (input: IActivityInput) => ({
  query: `mutation {
    createActivity(input: {
        name: "${input.name}"
        sub_sector: "${input.sub_sector}"
    }) {
        ...on IActivitySimple {
            _id
            name
            sub_sector
            sub_sector
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

export const UpdateActivityBodyTag = "updateActivity"
export const UpdateActivityBody = (input: IActivityEdit) => ({
  query: `mutation {
    updateActivity(input: {
        _id: "${input._id}"
        name: "${input.name}"
        sub_sector: "${input.sub_sector}"
    }) {
        ...on IActivitySimple {
            _id
            name
            sub_sector
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

export const RemoveActivityBodyTag = "removeOneActivity"
export const RemoveActivityBody = (_id: string) => ({
  query: `mutation {
    removeOneActivity(_id: "${_id}") {
      _id
      name
      sub_sector
      createdAt
      updatedAt
    }
  }`
})