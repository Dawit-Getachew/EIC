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

export interface InputFetchAdminWorkPermitsBody {
  _id: string;
  role: string;
}
export const FetchAdminWorkPermitsBodyTag = "fetchAdminWorkPermits"
export const FetchAdminWorkPermitsBody = (input: InputFetchAdminWorkPermitsBody) => ({
  query: `{
    fetchAdminWorkPermits(input: {
      _id: "${input._id}"
      role: ${input.role}
    }) {
      _id
      company_name
      company_name_amharic
      permit_status
      address {
        country
        region
        region_amharic
        zone
        zone_amharic
        city
        city_amharic
        sub_city
        sub_city_amharic
        wereda
        wereda_amharic
        house_number
        email
        telephone_direct
        telephone_mobile
        fax
        po_box
        other_address
      }
      country_of_incorporation
      business_activity
      business_location
      capital_of_enterprise
      investment_permit_license_number
      date_of_issuance
      business_license_number
      business_license_date_of_issuance
      expansion_license_number
      expansion_license_date_of_issuance
      tin_number
      current_total_number_of_expats
      current_total_number_of_expansion
      current_number_of_permanent_eth_employees
      current_number_of_holding_eth_management_posts
      bio_data_expat_information {
        full_name
        full_name_amharic
        gender
        date_of_birth
        nationality
        passport_number
        passport_valid_until
        visa_type
        visa_date_of_issue
        visa_valid_until_till
        title_to_be_occupied_by_expat
        project_phase_expat_employment_is_sought
        agreed_length_of_empl_per_empl_contract
        expat_qualification {
          education_level
          professional_skill
          years_of_experiance
        }
        expected_date_of_employment
        basic_salary_in_birr
        monthly_allowance_in_birr
      }
      replacement_employees {
        name
        age
        gender
        full_address
        description_of_academic_credentials_and_experience
        content_of_training_program_designed_to_replace_the_expat
        type_of_training
        start_training_at
        end_training_at
        handover_time
        estimate_of_total_time_required_to_transfer_knowledge_and_skills
      }
      certification {
        name
        title
        date
      }
      permit_documents {
        picture
        passport
        investment_permit
      }
      service_id
      createdAt
      updatedAt
    }
  }`
})

export const PostAdminBodyTag = "signUpAccount"
export const PostAdminBody = (input: IAccountInput) => ({
  query: `mutation {
    signUpAccount(input: {
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