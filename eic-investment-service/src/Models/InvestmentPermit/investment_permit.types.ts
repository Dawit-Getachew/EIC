import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "../../Common/interface";

export { IBasicID, IBasicIDs }

export const GQLResponseTag = "IInvestmentPermitSimple"

export interface IInvestmentPermitResolver {
  Query: IInvestmentPermitQuery
  Mutation: IInvestmentPermitMutation
}

export interface IInvestmentPermitQuery {
  fetchInvestmentPermits: (parent: any, args: any, context: any) => Promise<IInvestmentPermitDoc<IInvestmentPermit[]>>
  fetchOneInvestmentPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitDoc<IInvestmentPermit>>
  fetchManyInvestmentPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitDoc<IInvestmentPermit[]>>
}

export interface IInvestmentPermitMutation {
  postInvestmentPermit: (parent: any, args: IPostInvestmentPermit, context: any) => Promise<IInvestmentPermitDoc<IInvestmentPermit>>
  editInvestmentPermit: (parent: any, args: IEditInvestmentPermit, context: any) => Promise<IInvestmentPermitDoc<IInvestmentPermit>>
  removeOneInvestmentPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitDoc<IInvestmentPermit>>
  removeManyInvestmentPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitDoc<IInvestmentPermit[]>>
  removeAllInvestmentPermits: (parent: any, args: any, context: any) => Promise<IInvestmentPermitDoc<string>>
}

export interface IInvestmentPermit extends IBasicDoc {
  ref_number: string
  registration_number: string
  tin_number: string
  company_name: string
  company_name_amharic: string
  trade_name: string
  trade_name_amharic: string
  investor_nationality: string
  type_of_business: string
  type_of_ownership: string
  shareholders: IShareHolder[]
  manager_full_name: string
  manager_full_name_amharic: string
  company_address: IBusinessAddress
  representative_address: IBusinessAddress
  sector: string
  investment_activity: string
  investment_activity_amharic: string
  project_description: string
  investment_address: IBusinessAddress
  land_size_sqm: number
  land_acquisition_type: string
  investment_capital_usd: number
  investment_capital_birr: number
  permit_status: InvestmentPermitStatus
  permit_documents: {
    power_of_attorney: string
    investment_visa_for_foreigners: string
    notarized_minutes_of_resolution: string
    passport: string
    project_proposal: string
    certificate_of_incorporation: string
    memorandum_and_articles_of_association: string
    business_background: string
  }
  products: IProduct[]
  raw_materials: IRawMaterial[],
  heard_from: string,
  enviromental_impact: string,
  market_destination_local_amount: number
  market_destination_export_amount: number
  equity: number
  loan: number
  number_of_employees: number
  home_address: IBusinessAddress
  representative_full_name: string
  investor_id: string
  company_registration_form: string
  company_registration_bank_slip_form: string
  memorandum_bank_slip_form: string
  credit_service_bank_slip_form: string
  memorandum_of_association: string
  service_fee_bank_slip_form: string
  edited_name: string
  edited_name_amharic: string
  edited_trade_name: string
  edited_trade_name_amharic: string
  employee_information: object
  selected_bank: string
  isAssigned: boolean
  assignedTo: IAssignAdmin
  capital_registration: object
  draft_minutes: string
}

export interface IProduct {
  name: string
  quantity: number
  local_share_market: number
  export_share_market: number
  unit: string
  capacity: string
}

export interface IRawMaterial {
  name: string
  quantity: number
  local_source: number
  import_source: number
  unit: string
}

export interface IInvestmentPermitDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IInvestmentPermitInput {
  company_name: string
  company_name_amharic: string
  trade_name: string
  trade_name_amharic: string
  investor_nationality: string
  type_of_business: string
  type_of_ownership: string
  shareholders: IShareHolder[]
  manager_full_name: string
  manager_full_name_amharic: string
  company_address: IBusinessAddress
  representative_address: IBusinessAddress
  sector: string
  investment_activity: string
  investment_activity_amharic: string
  project_description: string
  investment_address: IBusinessAddress
  land_size_sqm: number
  land_acquisition_type: string
  investment_capital_usd: number
  investment_capital_birr: number
  permit_documents: {
    power_of_attorney: string
    investment_visa_for_foreigners: string
    notarized_minutes_of_resolution: string
    passport: string
    project_proposal: string
    certificate_of_incorporation: string
    memorandum_and_articles_of_association: string
    business_background: string
  }
  products: IProduct[]
  raw_materials: IRawMaterial[],
  heard_from: string,
  enviromental_impact: string,
  market_destination_local_amount: number
  market_destination_export_amount: number
  equity: number
  loan: number
  number_of_employees: number
  home_address: IBusinessAddress
  representative_full_name: string
  employee_information: object
  investor_id: string
  draft_minutes: string
  capital_registration: object
}

export interface IInvestmentPermitEdit {
  _id: string
  registration_number?: string
  tin_number?: string
  company_name?: string
  company_name_amharic?: string
  trade_name?: string
  trade_name_amharic?: string
  investor_nationality?: string
  type_of_business?: string
  type_of_ownership?: string
  shareholders?: IShareHolder[]
  manager_full_name?: string
  manager_full_name_amharic?: string
  company_address?: IBusinessAddress
  representative_address?: IBusinessAddress
  sector?: string
  investment_activity?: string
  investment_activity_amharic?: string
  project_description?: string
  investment_address?: IBusinessAddress
  land_size_sqm?: number
  land_acquisition_type?: string
  investment_capital_usd?: number
  investment_capital_birr?: number
  permit_documents?: {
    power_of_attorney: string
    investment_visa_for_foreigners: string
    notarized_minutes_of_resolution: string
    passport: string
    project_proposal: string
    certificate_of_incorporation: string
    memorandum_and_articles_of_association: string
    business_background: string
  }
  products?: IProduct[]
  raw_materials?: IRawMaterial[],
  heard_from?: string,
  enviromental_impact?: string,
  market_destination_local_amount?: number
  market_destination_export_amount?: number
  equity?: number
  loan?: number
  number_of_employees?: number
  home_address?: IBusinessAddress
  representative_full_name?: string
  investor_id?: string
  company_registration_form?: string
  company_registration_bank_slip_form?: string
  memorandum_bank_slip_form?: string
  credit_service_bank_slip_form?: string
  memorandum_of_association?: string
  service_fee_bank_slip_form?: string
  edited_name?: string
  edited_name_amharic?: string
  edited_trade_name?: string
  edited_trade_name_amharic?: string
  employee_information?: object
  selected_bank?: string
  isAssigned?: boolean;
  assignedTo?: IAssignAdmin;
  draft_minutes?: string
  capital_registration?: object
}

export interface IPostInvestmentPermit {
  input: IInvestmentPermitInput
}

export interface IEditInvestmentPermit {
  input: IInvestmentPermitEdit
}

export interface IShareHolder {
  name: string
  nationality: string
  country_of_incorporation: string
  address: string
}

export enum InvestmentPermitStatus {
  DRAFTED = "DRAFTED",
  ACCEPTED = "ACCEPTED",
  REVIEWED = "REVIEWED",
  VERIFIED = "VERIFIED",
  APPROVED = "APPROVED",
  RENEWED = "RENEWED",
  CANCELLED = "CANCELLED",
  SENT_COMPANY_NAME = "SENT_COMPANY_NAME",
  APPROVED_COMPANY_NAME = "APPROVED_COMPANY_NAME",
  SENT_NEW_COMPANY_NAME = "SENT_NEW_COMPANY_NAME",
  REGISTERED_COMPANY_NAME = "REGISTERED_COMPANY_NAME",
  REGISTERED_TIN_NUMBER = "REGISTERED_TIN_NUMBER",
  SENT_COMPANY_REGISTRATION_BANK_SLIP = "SENT_COMPANY_REGISTRATION_BANK_SLIP",
  SENT_MEMORANDUM_BANK_SLIP = "SENT_MEMORANDUM_BANK_SLIP",
  SENT_MEMORANDUM_OF_ARTICLES = "SENT_MEMORANDUM_OF_ARTICLES",
  SENT_CREDIT_SERVICE_BANK_SLIP = "SENT_CREDIT_SERVICE_BANK_SLIP",
  SENT_SERVICE_FEE_BANK_SLIP = "SENT_SERVICE_FEE_BANK_SLIP",
  ACCEPTED_MEMORANDUM_OF_ARTICLES = "ACCEPTED_MEMORANDUM_OF_ARTICLES",
  ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP = "ACCEPTED_COMPANY_REGISTRATION_BANK_SLIP",
  ACCEPTED_MEMORANDUM_BANK_SLIP = "ACCEPTED_MEMORANDUM_BANK_SLIP",
  ACCEPTED_CREDIT_SERVICE_BANK_SLIP = "ACCEPTED_CREDIT_SERVICE_BANK_SLIP",
  ACCEPTED_SERVICE_FEE_BANK_SLIP = "ACCEPTED_SERVICE_FEE_BANK_SLIP"
}

export interface IAssignAdmin {
  case_worker: string;
  team_leader: string;
  director: string;
}