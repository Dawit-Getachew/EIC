import { IWorkPermitInput } from "./types"
import { getGQLDate } from "../Helpers/date"

const getValue = (value: any) => {
  return value? value : ""
}

export const CreateWorkPermitBodyTag = "createWorkPermit"
export const CreateWorkPermitBody = (input: IWorkPermitInput) => ({
  query: `mutation {
    createWorkPermit(input: {
      company_name: "${getValue(input.company_name)}"
      company_name_amharic: "${getValue(input.company_name_amharic)}"
      address: {
        country: "${getValue(input.address.country)}"
        region: "${getValue(input.address.region)}"
        region_amharic: "${getValue(input.address.region_amharic)}"
        zone: "${getValue(input.address.zone)}"
        zone_amharic: "${getValue(input.address.zone_amharic)}"
        city: "${getValue(input.address.city)}"
        city_amharic: "${getValue(input.address.city_amharic)}"
        sub_city: "${getValue(input.address.sub_city)}"
        sub_city_amharic: "${getValue(input.address.sub_city_amharic)}"
        wereda: "${getValue(input.address.wereda)}"
        wereda_amharic: "${getValue(input.address.wereda_amharic)}"
        house_number: "${getValue(input.address.house_number)}"
        email: "${getValue(input.address.email)}"
        telephone_mobile: "${getValue(input.address.telephone_mobile)}"
        telephone_direct: "${getValue(input.address.telephone_direct)}"
        fax: "${getValue(input.address.fax)}"
        po_box: "${getValue(input.address.po_box)}"
        other_address: "${getValue(input.address.other_address)}"
      }
      country_of_incorporation: "${getValue(input.country_of_incorporation)}"
      business_activity: "${getValue(input.country_of_incorporation)}"
      capital_of_enterprise: "${getValue(input.capital_of_enterprise)}"
      investment_permit_license_number: "${getValue(input.investment_permit_license_number)}"
      date_of_issuance: "${getGQLDate(input.date_of_issuance)}"
      expansion_license_number: "${getValue(input.expansion_license_number)}"
      current_total_number_of_expats: ${getValue(input.current_total_number_of_expats)}
      current_total_number_of_expansion: ${getValue(input.current_total_number_of_expansion)}
      current_number_of_permanent_eth_employees: ${getValue(input.current_number_of_permanent_eth_employees)}
      current_number_of_holding_eth_management_posts: ${getValue(input.current_number_of_holding_eth_management_posts)}
      bio_data_expat_information: {
        full_name: "${getValue(input.bio_data_expat_information.full_name)}"
        full_name_amharic: "${getValue(input.bio_data_expat_information.full_name_amharic)}"
        gender: "${getValue(input.bio_data_expat_information.gender)}"
        date_of_birth: "${getGQLDate(input.bio_data_expat_information.date_of_birth)}"
        nationality: "${getValue(input.bio_data_expat_information.nationality)}"
        passport_number: "${getValue(input.bio_data_expat_information.passport_number)}"
        passport_valid_until: "${getGQLDate(input.bio_data_expat_information.passport_valid_until)}"
        visa_type: "${getValue(input.bio_data_expat_information.visa_type)}"
        visa_date_of_issue: "${getGQLDate(input.bio_data_expat_information.visa_date_of_issue)}"
        visa_valid_until_till: "${getGQLDate(input.bio_data_expat_information.visa_valid_until_till)}"
        title_to_be_occupied_by_expat: "${getValue(input.bio_data_expat_information.title_to_be_occupied_by_expat)}"
        project_phase_expat_employment_is_sought: "${getValue(input.bio_data_expat_information.project_phase_expat_employment_is_sought)}"
        agreed_length_of_empl_per_empl_contract: "${getValue(input.bio_data_expat_information.agreed_length_of_empl_per_empl_contract)}"
        expat_qualification: {
          education_level: "${getValue(input.bio_data_expat_information.expat_qualification.education_level)}"
          professional_skill: "${getValue(input.bio_data_expat_information.expat_qualification.professional_skill)}"
          years_of_experiance: "${getValue(input.bio_data_expat_information.expat_qualification.years_of_experiance)}"
        }
        expected_date_of_employment: "${getGQLDate(input.bio_data_expat_information.expected_date_of_employment)}"
        basic_salary_in_birr: ${getValue(input.bio_data_expat_information.basic_salary_in_birr)}
        monthly_allowance_in_birr: ${getValue(input.bio_data_expat_information.monthly_allowance_in_birr)}
      }
      replacement_employees: [${input.replacement_employees.map(item => `{
        name: "${getValue(item.name)}"
        age: ${getValue(item.age)}
        gender: "${getValue(item.gender)}"
        full_address: "${getValue(item.full_address)}"
        description_of_academic_credentials_and_experience: "${getValue(item.description_of_academic_credentials_and_experience)}"
        content_of_training_program_designed_to_replace_the_expat: "${getValue(item.content_of_training_program_designed_to_replace_the_expat)}"
        schedule_of_training_program: "${getValue(item.schedule_of_training_program)}"
        estimate_of_total_time_required_to_transfer_knowledge_and_skills: "${getValue(item.estimate_of_total_time_required_to_transfer_knowledge_and_skills)}"
      }`)}]
      certification: {
        name: "${getValue(input.certification.name)}"
        title: "${getValue(input.certification.title)}"
        date: "${getGQLDate(input.certification.date)}"
      }
      permit_documents: {
        picture: "${getValue(input.permit_documents.picture)}"
      }
      heard_from: "${getValue(input.heard_from)}"
      service_id: "${getValue(input.service_id)}"
    }) {
      ...on IWorkPermitSimple {
        _id
        company_name
        company_name_amharic
        permit_status
        address {
          country
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
        capital_of_enterprise
        investment_permit_license_number
        date_of_issuance
        expansion_license_number
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
          schedule_of_training_program
          estimate_of_total_time_required_to_transfer_knowledge_and_skills
        }
        certification {
          name
          title
          date
        }
        permit_documents {
          picture
        }
        heard_from
        service_id
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
      capital_of_enterprise
      investment_permit_license_number
      date_of_issuance
      expansion_license_number
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
        schedule_of_training_program
        estimate_of_total_time_required_to_transfer_knowledge_and_skills
      }
      certification {
        name
        title
        date
      }
      permit_documents {
        picture
      }
      heard_from
      service_fee
      service_id
      createdAt
      updatedAt
    }
  }`
})

export const UpdateServiceFeeBodyTag = "updateWorkPermit"
export const UpdateServiceFeeBody = (input: {
  _id: string; service_fee: string;
}) => ({
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
        service_fee
        address {
          country
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
        capital_of_enterprise
        investment_permit_license_number
        date_of_issuance
        expansion_license_number
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
          schedule_of_training_program
          estimate_of_total_time_required_to_transfer_knowledge_and_skills
        }
        certification {
          name
          title
          date
        }
        permit_documents {
          picture
        }
        heard_from
        service_id
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