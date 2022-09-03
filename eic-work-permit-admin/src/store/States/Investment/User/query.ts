import { IUserEdit, IUserInput } from "src/models/InvestmentModels/user"

export const FetchUsersBodyTag = "fetchUsers"
export const FetchUsersBody = () => ({
  query: `{
    fetchUsers {
      _id
      first_name
      middle_name
      last_name
      email
      gender
      role
      service_id
      phone_number
      createdAt
      updatedAt
    }
  }`
})

export const CreateUserBodyTag = "createUser"
export const CreateUserBody = (input: IUserInput) => ({
  query: `mutation {
    createUser(input: {
    }) {
      ...on IUserSimple {
        _id
        content
        from_user
        to_user
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

export const UpdateUserBodyTag = "updateUser"
export const UpdateUserBody = (input: IUserEdit) => ({
  query: `mutation {
    updateUser(input: {
      _id: "61fa37597daecd8dd796a43d"
      title: "titlessss"
      project_stage: INITIAL
      environmental_impact: "environmental_impact"
      project_summary: "project_summary"
      address: {
        region: "String"
        zone: "String"
        city: "String"
        sub_city: "String"
        house_number: "String"
        email: "String"
        telephone_direct: "String"
        telephone_mobile: "String"
        fax: "String"
        po_box: "String"
        other_address: "String"
      }
      category_sector: "61f940e0c592db64b5bec50f"
      category_sub_sector: "61f940e0c592db64b5bec54c"
      category_activity: "61f940e0c592db64b5bec595"
      category_investment_activity: "61f940e1c592db64b5bec664"
    }) {
      ...on IUserSimple {
        _id
        title
        project_stage
        environmental_impact
        project_summary
        category_sector
        category_sub_sector
        category_activity
        category_investment_activity
        address {
          region
          zone
          city
          kebele
          house_number
          email
          telephone_direct
          telephone_mobile
          fax
          po_box
          other_address
        }
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

export const RemoveUserBodyTag = "removeOneUser"
export const RemoveUserBody = (_id: string) => ({
  query: `mutation {
    removeOneUser(_id: "${_id}") {
      _id
      title
      project_stage
      environmental_impact
      project_summary
      category_sector
      category_sub_sector
      category_activity
      category_investment_activity
      address {
        region
        zone
        city
        kebele
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      createdAt
      updatedAt
    }
  }`
})