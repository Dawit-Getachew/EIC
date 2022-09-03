import { IInvestmentActivityEdit, IInvestmentActivityInput } from "src/models/InvestmentModels/Category/investment_activity"

export const FetchInvestmentActivitiesBodyTag = "fetchInvestmentActivities"
export const FetchInvestmentActivitiesBody = () => ({
  query: `{
    fetchInvestmentActivities {
      _id
      name
      activity
      createdAt
      updatedAt
    }
  }`
})

export const CreateInvestmentActivityBodyTag = "createInvestmentActivity"
export const CreateInvestmentActivityBody = (input: IInvestmentActivityInput) => ({
  query: `mutation {
    createInvestmentActivity(input: {
        name: "${input.name}"
        activity: "${input.activity}"
    }) {
        ...on IInvestmentActivitySimple {
            _id
            name
            activity
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

export const UpdateInvestmentActivityBodyTag = "updateInvestmentActivity"
export const UpdateInvestmentActivityBody = (input: IInvestmentActivityEdit) => ({
  query: `mutation {
    updateInvestmentActivity(input: {
        _id: "${input._id}"
        name: "${input.name}"
        activity: "${input.activity}"
    }) {
        ...on IInvestmentActivitySimple {
            _id
            name
            activity
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

export const RemoveInvestmentActivityBodyTag = "removeOneInvestmentActivity"
export const RemoveInvestmentActivityBody = (_id: string) => ({
  query: `mutation {
    removeOneInvestmentActivity(_id: "${_id}") {
      _id
      name
      activity
      createdAt
      updatedAt
    }
  }`
})