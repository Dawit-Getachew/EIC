import { InvestmentPermitStatus, IRawMaterial, IShareHolder } from "./investment_permit";
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "src/common/interface";
import { IProduct } from "./product";

export const GQLResponseTag = "IInvestmentPermitExpansionSimple"

export interface IInvestmentPermitExpansionResolver {
  Query: IInvestmentPermitExpansionQuery
  Mutation: IInvestmentPermitExpansionMutation
}

export interface IInvestmentPermitExpansionQuery {
  fetchInvestmentPermitExpansions: (parent: any, args: any, context: any) => Promise<IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion[]>>
  fetchOneInvestmentPermitExpansionByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion>>
  fetchManyInvestmentPermitExpansionsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion[]>>
}

export interface IInvestmentPermitExpansionMutation {
  postInvestmentPermitExpansion: (parent: any, args: IPostInvestmentPermitExpansion, context: any) => Promise<IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion>>
  editInvestmentPermitExpansion: (parent: any, args: IEditInvestmentPermitExpansion, context: any) => Promise<IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion>>
  removeOneInvestmentPermitExpansionByID: (parent: any, args: IBasicID, context: any) => Promise<IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion>>
  removeManyInvestmentPermitExpansionsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IInvestmentPermitExpansionDoc<IInvestmentPermitExpansion[]>>
  removeAllInvestmentPermitExpansions: (parent: any, args: any, context: any) => Promise<IInvestmentPermitExpansionDoc<string>>
}

export interface IInvestmentPermitExpansion extends IBasicDoc {
  company_name: string
  company_name_amharic: string
  type_of_business: string
  type_of_ownership: string
  shareholders: IShareHolder[]
  manager_full_name: string
  company_address: IBusinessAddress
  company_expansion_address: IBusinessAddress
  representative_address: IBusinessAddress
  sector: string
  investment_activity: string
  project_description: string
  investment_address: IBusinessAddress
  land_size_sqm: number
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
  current_products: IProduct[]
  anticipated_products: IAnticipatedProduct[]
  raw_materials: IRawMaterial[],
  heard_from: string,
  enviromental_impact: string,
  market_destination_type: string,
  market_destination_amount: number
  equity: number
  loan: number
  number_of_employees: number
  previous_employees: IEmployeeCount
  expected_employees: IExpectedEmployees
  home_address: IBusinessAddress
  representative_full_name: string
  investor_id: string
  project_impl_plan: IProjectImplementationPlan
  project_utilities: IProjectUtility
  investment_costs: InvestmentCost
  expansion_documents: IExpansionDocuments
  factors_influencing_plan: string
  how_to_avoid_problems: string
  support_needed_from_eic: string
  other_documents: string
  invesment_permit_id: string
  starting_date: Date
  ending_date: Date
  proposed_investment_capital: number
}

export interface IInvestmentPermitExpansionDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IInvestmentPermitExpansionInput {
  company_name: string
  company_name_amharic: string
  type_of_business: string
  type_of_ownership: string
  shareholders: IShareHolder[]
  manager_full_name: string
  company_address: IBusinessAddress
  company_expansion_address: IBusinessAddress
  representative_address: IBusinessAddress
  sector: string
  investment_activity: string
  project_description: string
  investment_address: IBusinessAddress
  land_size_sqm: number
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
  current_products: IProduct[]
  anticipated_products: IAnticipatedProduct[]
  raw_materials: IRawMaterial[],
  heard_from: string,
  enviromental_impact: string,
  market_destination_type: string,
  market_destination_amount: number
  equity: number
  loan: number
  number_of_employees: number
  previous_employees: IEmployeeCount
  expected_employees: IExpectedEmployees
  home_address: IBusinessAddress
  representative_full_name: string
  investor_id: string
  project_impl_plan: IProjectImplementationPlan
  project_utilities: IProjectUtility
  investment_costs: InvestmentCost
  expansion_documents: IExpansionDocuments
  factors_influencing_plan: string
  how_to_avoid_problems: string
  support_needed_from_eic: string
  other_documents: string
  invesment_permit_id: string
  starting_date: Date
  ending_date: Date
  proposed_investment_capital: number
}

export interface IInvestmentPermitExpansionEdit {
  _id: string
  company_name?: string
  company_name_amharic?: string
  type_of_business?: string
  type_of_ownership?: string
  shareholders?: IShareHolder[]
  manager_full_name?: string
  company_address?: IBusinessAddress
  company_expansion_address?: IBusinessAddress
  representative_address?: IBusinessAddress
  sector?: string
  investment_activity?: string
  project_description?: string
  investment_address?: IBusinessAddress
  land_size_sqm?: number
  investment_capital_usd?: number
  investment_capital_birr?: number
  permit_status?: InvestmentPermitStatus
  permit_documents?: {
    power_of_attorney?: string
    investment_visa_for_foreigners?: string
    notarized_minutes_of_resolution?: string
    passport?: string
    project_proposal?: string
    certificate_of_incorporation?: string
    memorandum_and_articles_of_association?: string
    business_background?: string
  }
  products?: IProduct[]
  current_products?: IProduct[]
  anticipated_products?: IAnticipatedProduct[]
  raw_materials?: IRawMaterial[],
  heard_from?: string,
  enviromental_impact?: string,
  market_destination_type?: string,
  market_destination_amount?: number
  equity?: number
  loan?: number
  number_of_employees?: number
  previous_employees?: IEmployeeCount
  expected_employees?: IExpectedEmployees
  home_address?: IBusinessAddress
  representative_full_name?: string
  investor_id?: string
  project_impl_plan?: IProjectImplementationPlan
  project_utilities?: IProjectUtility
  investment_costs?: InvestmentCost
  expansion_documents?: IExpansionDocuments
  factors_influencing_plan?: string
  how_to_avoid_problems?: string
  support_needed_from_eic?: string
  other_documents?: string
  invesment_permit_id?: string
  starting_date?: Date
  ending_date?: Date
  proposed_investment_capital?: number
}

export interface IPostInvestmentPermitExpansion {
  input: IInvestmentPermitExpansionInput
}

export interface IEditInvestmentPermitExpansion {
  input: IInvestmentPermitExpansionEdit
}

export interface InvestmentCost {
  land: number
  building: number
  working_capital: number
  machinery: number
  material: number
  other_costs: number
}

export interface IEmployeeCount {
  permanent_female_amount: number
  temporary_female_amount: number
  permanent_male_amount: number
  temporary_male_amount: number
}

export interface IExpectedEmployees {
  permanent_amount: number
  temporary_amount: number
}

export interface IProjectUtility {
  size_of_land_sqm: number
  electrical_power_kw: number
  water_m3: number
  telecom_services_needed: string
  other_services: string
}

export interface IAnticipatedProduct extends IProduct {
  percentage_capacity_increased: number
  percentage_unit_increased: number
}

export interface IProjectImplementationPlan {
  project_devt_feasiblility_study: Date
  land_acquisition: Date
  building_civil_work: Date
  public_utility_acquisition: {
    electricity: Date
    water: Date
    telecom: Date
    other: Date
  }
  machinery_procurement_purchase: Date
  reaching_of_machinery_at_project_site: Date
  work_permit_for_technician: Date
  machinery_erection_installation: Date
  preparation_of_raw_material: Date
  co_missing_machines_and_make_ready_for_operator: Date
  common_cement_of_product_service: Date
  other: Date
}

export interface IExpansionDocuments {
  copy_of_business_license: string
  financial_statement: string
  feasibility_study: string
  list_of_capital_good_and_raw_materials: string
  land_lice_agreement: string
}