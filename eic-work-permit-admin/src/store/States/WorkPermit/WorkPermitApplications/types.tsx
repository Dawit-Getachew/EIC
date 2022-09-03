import { IBasicDoc, IBasicDocument, IBasicID, IBasicIDs, IBusinessAddress } from "src/common/interface"

export const GQLResponseTag = "IWorkPermitSimple"

export interface IWorkPermitResolver {
  Query: IWorkPermitQuery
  Mutation: IWorkPermitMutation
}

export interface IWorkPermitQuery {
  fetchWorkPermits: (parent: any, args: any, context: any) => Promise<IWorkPermitDoc<IWorkPermit[]>>
  fetchOneWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IWorkPermitDoc<IWorkPermit>>
  fetchManyWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IWorkPermitDoc<IWorkPermit[]>>
}

export interface IWorkPermitMutation {
  postWorkPermit: (parent: any, args: IPostWorkPermit, context: any) => Promise<IWorkPermitDoc<IWorkPermit>>
  editWorkPermit: (parent: any, args: IEditWorkPermit, context: any) => Promise<IWorkPermitDoc<IWorkPermit>>
  removeOneWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IWorkPermitDoc<IWorkPermit>>
  removeManyWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IWorkPermitDoc<IWorkPermit[]>>
  removeAllWorkPermits: (parent: any, args: any, context: any) => Promise<IWorkPermitDoc<string>>
}

export interface IWorkPermit extends IBasicDoc {
  company_name: string;
  company_name_amharic: string;
  address: IBusinessAddress;
  country_of_incorporation: string;
  business_activity: string;
  capital_of_enterprise: string;
  investment_permit_license_number: string;
  date_of_issuance: Date;
  expansion_license_number: string;
  current_total_number_of_expats: number;
  current_total_number_of_expansion: number;
  current_number_of_permanent_eth_employees: number;
  current_number_of_holding_eth_management_posts: number;
  bio_data_expat_information: IBioDataExpatInformation;
  replacement_employees: IReplacementEmployee[];
  certification: ICertification;
  permit_documents: IPermitDocuments;
  heard_from: string;
  service_id: string;
  service_fee: string;
  permit_status: PermitStatus;
  document_number: string;
}

export interface IWorkPermitDoc<IDataType> extends IBasicDocument<IDataType> {}


export interface IWorkPermitInput {
  company_name: string;
  company_name_amharic: string;
  address: IBusinessAddress;
  country_of_incorporation: string;
  business_activity: string;
  capital_of_enterprise: string;
  investment_permit_license_number: string;
  date_of_issuance: Date;
  expansion_license_number: string;
  current_total_number_of_expats: number;
  current_total_number_of_expansion: number;
  current_number_of_permanent_eth_employees: number;
  current_number_of_holding_eth_management_posts: number;
  bio_data_expat_information: IBioDataExpatInformation;
  replacement_employees: IReplacementEmployee[];
  certification: ICertification;
  permit_documents: IPermitDocuments;
  heard_from: string;
  service_id: string;
}


export interface IWorkPermitEdit {
  _id: string
  company_name?: string;
  company_name_amharic?: string;
  address?: IBusinessAddress;
  country_of_incorporation?: string;
  business_activity?: string;
  capital_of_enterprise?: string;
  investment_permit_license_number?: string;
  date_of_issuance?: Date;
  expansion_license_number?: string;
  current_total_number_of_expats?: number;
  current_total_number_of_expansion?: number;
  current_number_of_permanent_eth_employees?: number;
  current_number_of_holding_eth_management_posts?: number;
  bio_data_expat_information?: IBioDataExpatInformation;
  replacement_employees?: IReplacementEmployee[];
  certification?: ICertification;
  permit_documents?: IPermitDocuments;
  heard_from?: string;
  service_fee?: string;
  permit_status?: PermitStatus;
}

export interface IPostWorkPermit {
  input: IWorkPermitInput
}

export interface IEditWorkPermit {
  input: IWorkPermitEdit
}

export interface IExpatQualification {
  education_level: string;
  professional_skill: string;
  years_of_experiance: string;
}

export interface IBioDataExpatInformation {
  full_name: string;
  full_name_amharic: string;
  gender: string;
  date_of_birth: Date;
  nationality: string;
  passport_number: string;
  passport_valid_until: Date;
  visa_type: string;
  visa_date_of_issue: Date;
  visa_valid_until_till: Date;
  title_to_be_occupied_by_expat: string;
  project_phase_expat_employment_is_sought: string;
  agreed_length_of_empl_per_empl_contract: string;
  expat_qualification: IExpatQualification;
  expected_date_of_employment: Date;
  basic_salary_in_birr: number;
  monthly_allowance_in_birr: number;
}

export interface IReplacementEmployee {
  name: string;
  age: number;
  gender: string;
  full_address: string;
  description_of_academic_credentials_and_experience: string;
  content_of_training_program_designed_to_replace_the_expat: string;
  schedule_of_training_program: string;
  estimate_of_total_time_required_to_transfer_knowledge_and_skills: string;
}

export interface ICertification {
  name: string;
  title: string;
  date: Date;
}

export interface IPermitDocuments {
  picture: string;
}

export enum PermitStatus {
  DRAFTED = "DRAFTED",
  REVIEWED = "REVIEWED",
  VERIFIED = "VERIFIED",
  APPROVED = "APPROVED",
  SENT_SERVICE_FEE = "SENT_SERVICE_FEE",
  ACCEPTED_SERVICE_FEE = "ACCEPTED_SERVICE_FEE",
  RENEWED = "RENEWED"
}