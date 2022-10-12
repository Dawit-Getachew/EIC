import { gql } from "apollo-server-express"
import { WorkPermitActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchUnAssigned, fetchAssigned, fetchAdminWorks, fetchMyPermits },
  Mutation: { edit, post, removeAll, removeMany, removeOne, assignToAdmins }
} = WorkPermitActions

export default gql`
  extend type Query {
    ${fetchAll}: [IWorkPermit]
    ${fetchUnAssigned}: [IWorkPermit]
    ${fetchAssigned}: [IWorkPermit]
    ${fetchAdminWorks}(input: InputAdminWorks!): [IWorkPermit]
    ${fetchMyPermits}(_id: String!): [IWorkPermit]
    ${fetchOneByID}(_id: ID!): IWorkPermit
    ${fetchManyByID}(_ids: [ID!]!): [IWorkPermit]
  }

  extend type Mutation {
    ${post}(input: IWorkPermitInput): IWorkPermitResponse
    ${edit}(input: IWorkPermitEdit): IWorkPermitResponse
    ${removeOne}(_id: ID!): IWorkPermit
    ${removeMany}(_ids: [ID!]!): [IWorkPermit]
    ${removeAll}: String
    ${assignToAdmins}(input: IAssignWorkToAdmin): IWorkPermitResponse
  }

  union IWorkPermitResponse = IWorkPermitSimple | SystemError | ValidationError | ValidationErrors

  type IWorkPermit {
    _id: ID
    company_name: String
    company_name_amharic: String
    address: IBusinessAddress
    country_of_incorporation: String
    business_activity: String
    business_location: String
    capital_of_enterprise: Float
    investment_permit_license_number: String
    date_of_issuance: Date
    business_license_number: String
    business_license_date_of_issuance: Date
    expansion_license_date_of_issuance: Date
    tin_number: String
    expansion_license_number: String
    current_total_number_of_expats: Int
    current_total_number_of_expansion: Int
    current_number_of_permanent_eth_employees: Int
    current_number_of_holding_eth_management_posts: Int
    bio_data_expat_information: IBioDataExpatInformation
    replacement_employees: [IReplacementEmployee]
    certification: ICertification
    permit_documents: IWorkPermitDocuments
    service_id: String
    service_fee: String
    permit_status: WorkPermitStatus
    isAssigned: Boolean
    assignedTo: IAssignAdmin
    document_number: String
    createdAt: Date
    updatedAt: Date
  }

  type IWorkPermitSimple {
    _id: ID
    company_name: String
    company_name_amharic: String
    address: IBusinessAddress
    country_of_incorporation: String
    business_activity: String
    business_location: String
    capital_of_enterprise: Float
    investment_permit_license_number: String
    date_of_issuance: Date
    business_license_number: String
    business_license_date_of_issuance: Date
    expansion_license_date_of_issuance: Date
    tin_number: String
    expansion_license_number: String
    current_total_number_of_expats: Int
    current_total_number_of_expansion: Int
    current_number_of_permanent_eth_employees: Int
    current_number_of_holding_eth_management_posts: Int
    bio_data_expat_information: IBioDataExpatInformation
    replacement_employees: [IReplacementEmployee]
    certification: ICertification
    permit_documents: IWorkPermitDocuments
    service_id: String
    service_fee: String
    permit_status: WorkPermitStatus
    isAssigned: Boolean
    assignedTo: IAssignAdmin
    document_number: String
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IWorkPermitInput {
    company_name: String!
    company_name_amharic: String
    address: InputBusinessAddress!
    country_of_incorporation: String!
    business_activity: String!
    business_location: String!
    capital_of_enterprise: Float!
    investment_permit_license_number: String!
    date_of_issuance: Date!
    business_license_number: String
    business_license_date_of_issuance: Date
    expansion_license_number: String
    expansion_license_date_of_issuance: Date
    tin_number: String
    current_total_number_of_expats: Int!
    current_total_number_of_expansion: Int!
    current_number_of_permanent_eth_employees: Int!
    current_number_of_holding_eth_management_posts: Int!
    bio_data_expat_information: InputBioDataExpatInformation!
    replacement_employees: [InputReplacementEmployee]!
    certification: InputCertification!
    permit_documents: InputWorkPermitDocuments!
    service_id: String
  }

  input IWorkPermitEdit {
    _id: ID!
    company_name: String
    company_name_amharic: String
    address: InputBusinessAddress
    country_of_incorporation: String
    business_activity: String
    business_location: String
    capital_of_enterprise: Float
    investment_permit_license_number: String
    date_of_issuance: Date
    business_license_number: String
    business_license_date_of_issuance: Date
    expansion_license_number: String
    expansion_license_date_of_issuance: Date
    tin_number: String
    current_total_number_of_expats: Int
    current_total_number_of_expansion: Int
    current_number_of_permanent_eth_employees: Int
    current_number_of_holding_eth_management_posts: Int
    bio_data_expat_information: InputBioDataExpatInformation
    replacement_employees: [InputReplacementEmployee]
    certification: InputCertification
    permit_documents: InputWorkPermitDocuments
    service_fee: String
    permit_status: WorkPermitStatus
    isAssigned: Boolean
    assignedTo: InputAssignAdmin
    document_number: String
  }

  type IExpatQualification {
    education_level: String
    professional_skill: String
    years_of_experiance: String
  }

  input InputExpatQualification {
    education_level: String!
    professional_skill: String!
    years_of_experiance: String!
  }

  type IBioDataExpatInformation {
    full_name: String
    full_name_amharic: String
    gender: String
    date_of_birth: Date
    nationality: String
    passport_number: String
    passport_valid_until: Date
    visa_type: String
    visa_date_of_issue: Date
    visa_valid_until_till: Date
    title_to_be_occupied_by_expat: String
    project_phase_expat_employment_is_sought: String
    agreed_length_of_empl_per_empl_contract: String
    expat_qualification: IExpatQualification
    expected_date_of_employment: Date
    basic_salary_in_birr: Float
    monthly_allowance_in_birr: Float
  }

  input InputBioDataExpatInformation {
    full_name: String!
    gender: String!
    date_of_birth: Date!
    nationality: String!
    passport_number: String!
    passport_valid_until: Date!
    visa_type: String!
    visa_date_of_issue: Date!
    visa_valid_until_till: Date!
    title_to_be_occupied_by_expat: String!
    project_phase_expat_employment_is_sought: String!
    agreed_length_of_empl_per_empl_contract: String!
    expat_qualification: InputExpatQualification!
    expected_date_of_employment: Date!
    basic_salary_in_birr: Float!
    monthly_allowance_in_birr: Float!
  }

  type IReplacementEmployee {
    name: String
    age: Int
    gender: String
    full_address: String
    description_of_academic_credentials_and_experience: String
    content_of_training_program_designed_to_replace_the_expat: String
    type_of_training: String
    start_training_at: Date
    end_training_at: Date
    handover_time: Date
    estimate_of_total_time_required_to_transfer_knowledge_and_skills: String
  }

  input InputReplacementEmployee {
    name: String
    age: Int
    gender: String
    full_address: String
    description_of_academic_credentials_and_experience: String
    content_of_training_program_designed_to_replace_the_expat: String
    type_of_training: String
    start_training_at: Date
    end_training_at: Date
    handover_time: Date
    estimate_of_total_time_required_to_transfer_knowledge_and_skills: String
  }

  type ICertification {
    name: String
    title: String
    date: Date
  }

  input InputCertification {
    name: String
    title: String
    date: Date
  }

  type IWorkPermitDocuments {
    picture: String
    passport: String
    investment_permit: String
  }

  input InputWorkPermitDocuments {
    picture: String
    passport: String
    investment_permit: String
  }

  type IAssignAdmin {
    case_worker: String
    team_leader: String
    director: String
  }

  input IAssignWorkToAdmin {
    _id: ID!
    assignedTo: InputAssignAdmin!
    isAssigned: Boolean!
  }

  input InputAssignAdmin {
    case_worker: String!
    team_leader: String!
    director: String!
  }

  input InputAdminWorks {
    _id: ID!
    role: IRoleAccount
  }

`