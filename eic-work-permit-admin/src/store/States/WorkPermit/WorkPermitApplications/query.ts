export const FetchWorkPermitsBodyTag = "fetchWorkPermits"
export const FetchWorkPermitsBody = () => ({
  query: `{
    fetchWorkPermits {
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
      document_number
      createdAt
      updatedAt
    }
  }`
})

export interface IUpdateServiceFee {
  _id: string;
  service_fee: string;
}
export const UpdateServiceFeeBodyTag = "updateWorkPermit"
export const UpdateServiceFeeBody = (input: IUpdateServiceFee) => ({
  query: `mutation {
    updateWorkPermit(input: {
      _id: "${input._id}"
      service_fee: "${input.service_fee}"
      permit_status: SENT_SERVICE_FEE
    }) {
      ...on IWorkPermitSimple {
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
        document_number
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

export const UpdateWorkPermitStatusBodyTag = "updateWorkPermit"
export const UpdateWorkPermitStatusBody = (input: { _id: string; permit_status: string; }) => ({
  query: `mutation {
    updateWorkPermit(input: {
      _id: "${input._id}"
      permit_status: ${input.permit_status}
    }) {
      ...on IWorkPermitSimple {
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
        document_number
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

export const FetchUnAssignedWorkPermitsBodyTag = "fetchUnAssignedWorkPermits"
export const FetchUnAssignedWorkPermitsBody = () => ({
  query: `{
    fetchUnAssignedWorkPermits {
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
      isAssigned
      assignedTo {
        case_worker
        team_leader
        director
      }
      service_id
      document_number
      createdAt
      updatedAt
    }
  }`
})

export const FetchAssignedWorkPermitsBodyTag = "fetchAssignedWorkPermits"
export const FetchAssignedWorkPermitsBody = () => ({
  query: `{
    fetchAssignedWorkPermits {
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
      isAssigned
      assignedTo {
        case_worker
        team_leader
        director
      }
      service_id
      document_number
      createdAt
      updatedAt
    }
  }`
})

export interface InputAssignEmployeeToWorkPermitBody {
  _id: string;
  case_worker: string;
  team_leader: string;
  director: string;
}
export const AssignEmployeeToWorkPermitBodyTag = "updateWorkPermit"
export const AssignEmployeeToWorkPermitBody = (input: InputAssignEmployeeToWorkPermitBody) => ({
  query: `mutation {
    updateWorkPermit(input: {
      _id: "${input._id}"
      isAssigned: true
      assignedTo: {
        case_worker: "${input.case_worker}"
        team_leader: "${input.team_leader}"
        director: "${input.director}"
      }
    }){
      ...on IWorkPermitSimple {
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
        isAssigned
        assignedTo {
          case_worker
          team_leader
          director
        }
        service_id
        document_number
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
      isAssigned
      assignedTo {
        case_worker
        team_leader
        director
      }
      service_id
      document_number
      createdAt
      updatedAt
    }
  }`
})