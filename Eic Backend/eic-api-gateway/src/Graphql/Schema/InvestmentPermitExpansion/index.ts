import { gql } from "apollo-server-express"
import { InvestmentPermitExpansionActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = InvestmentPermitExpansionActions

export default gql`
  extend type Query {
    ${fetchAll}: [IInvestmentPermitExpansion]
    ${fetchOneByID}(_id: ID!): IInvestmentPermitExpansion
    ${fetchManyByID}(_ids: [ID!]!): [IInvestmentPermitExpansion]
  }

  extend type Mutation {
    ${post}(input: IInvestmentPermitExpansionInput): IInvestmentPermitExpansionResponse
    ${edit}(input: IInvestmentPermitExpansionEdit): IInvestmentPermitExpansionResponse
    ${removeOne}(_id: ID!): IInvestmentPermitExpansion
    ${removeMany}(_ids: [ID!]!): [IInvestmentPermitExpansion]
    ${removeAll}: String
  }

  union IInvestmentPermitExpansionResponse = IInvestmentPermitExpansionSimple | SystemError | ValidationError | ValidationErrors

  type IInvestmentPermitExpansion {
    _id: ID
    company_name: String
    company_name_amharic: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [IShareHolder]
    manager_full_name: String
    company_address: IBusinessAddress
    company_expansion_address: IBusinessAddress
    representative_address: IBusinessAddress
    sector: String
    investment_activity: String
    project_description: String
    investment_address: IBusinessAddress
    land_size_sqm: Float
    investment_capital_usd: Float
    investment_capital_birr: Float
    permit_status: InvestmentPermitStatus
    permit_documents: IPermitDocument
    products: [IPermitProduct]
    current_products: [IPermitProduct]
    anticipated_products: [IAnticipatedProduct]
    raw_materials: [IPermitRawMaterial]
    heard_from: String
    enviromental_impact: String
    market_destination_local_amount: Float
    market_destination_export_amount: Float
    equity: Float
    loan: Float
    number_of_employees: Float
    previous_employees: IEmployeeCount
    expected_employees: IExpectedEmployees
    home_address: IBusinessAddress
    representative_full_name: String
    investor_id: String
    project_impl_plan: IProjectImplementationPlan
    project_utilities: IProjectUtility
    investment_costs: IInvestmentCost
    expansion_documents: IExpansionDocuments
    factors_influencing_plan: String
    how_to_avoid_problems: String
    support_needed_from_eic: String
    other_documents: String
    invesment_permit_id: String
    starting_date: Date
    ending_date: Date
    proposed_investment_capital: Float
    ref_number: String
    createdAt: Date
    updatedAt: Date
  }

  type IInvestmentPermitExpansionSimple {
    _id: ID
    company_name: String
    company_name_amharic: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [IShareHolder]
    manager_full_name: String
    company_address: IBusinessAddress
    company_expansion_address: IBusinessAddress
    representative_address: IBusinessAddress
    sector: String
    investment_activity: String
    project_description: String
    investment_address: IBusinessAddress
    land_size_sqm: Float
    investment_capital_usd: Float
    investment_capital_birr: Float
    permit_status: InvestmentPermitStatus
    permit_documents: IPermitDocument
    products: [IPermitProduct]
    current_products: [IPermitProduct]
    anticipated_products: [IAnticipatedProduct]
    raw_materials: [IPermitRawMaterial]
    heard_from: String
    enviromental_impact: String
    market_destination_local_amount: Float
    market_destination_export_amount: Float
    equity: Float
    loan: Float
    number_of_employees: Float
    previous_employees: IEmployeeCount
    expected_employees: IExpectedEmployees
    home_address: IBusinessAddress
    representative_full_name: String
    investor_id: String
    project_impl_plan: IProjectImplementationPlan
    project_utilities: IProjectUtility
    investment_costs: IInvestmentCost
    expansion_documents: IExpansionDocuments
    factors_influencing_plan: String
    how_to_avoid_problems: String
    support_needed_from_eic: String
    other_documents: String
    invesment_permit_id: String
    starting_date: Date
    ending_date: Date
    proposed_investment_capital: Float
    ref_number: String
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IInvestmentPermitExpansionInput {
    company_name: String
    company_name_amharic: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [InputShareHolder]
    manager_full_name: String
    company_address: InputBusinessAddress
    company_expansion_address: InputBusinessAddress
    representative_address: InputBusinessAddress
    sector: String
    investment_activity: String
    project_description: String
    investment_address: InputBusinessAddress
    land_size_sqm: Float
    investment_capital_usd: Float
    investment_capital_birr: Float
    permit_status: InvestmentPermitStatus
    permit_documents: InputPermitDocument
    products: [InputPermitProduct]
    current_products: [InputPermitProduct]
    anticipated_products: [InputAnticipatedProduct]
    raw_materials: [InputPermitRawMaterial]
    heard_from: String
    enviromental_impact: String
    market_destination_local_amount: Float
    market_destination_export_amount: Float
    equity: Float
    loan: Float
    number_of_employees: Float
    previous_employees: InputEmployeeCount
    expected_employees: InputExpectedEmployees
    home_address: InputBusinessAddress
    representative_full_name: String
    investor_id: String
    project_impl_plan: InputProjectImplementationPlan
    project_utilities: InputProjectUtility
    investment_costs: InputInvestmentCost
    expansion_documents: InputExpansionDocuments
    factors_influencing_plan: String
    how_to_avoid_problems: String
    support_needed_from_eic: String
    other_documents: String
    invesment_permit_id: String
    starting_date: Date
    ending_date: Date
    proposed_investment_capital: Float
  }

  input IInvestmentPermitExpansionEdit {
    _id: ID!
    company_name: String
    company_name_amharic: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [InputShareHolder]
    manager_full_name: String
    company_address: InputBusinessAddress
    company_expansion_address: InputBusinessAddress
    representative_address: InputBusinessAddress
    sector: String
    investment_activity: String
    project_description: String
    investment_address: InputBusinessAddress
    land_size_sqm: Float
    investment_capital_usd: Float
    investment_capital_birr: Float
    permit_status: InvestmentPermitStatus
    permit_documents: InputPermitDocument
    products: [InputPermitProduct]
    current_products: [InputPermitProduct]
    anticipated_products: [InputAnticipatedProduct]
    raw_materials: [InputPermitRawMaterial]
    heard_from: String
    enviromental_impact: String
    market_destination_local_amount: Float
    market_destination_export_amount: Float
    equity: Float
    loan: Float
    number_of_employees: Float
    previous_employees: InputEmployeeCount
    expected_employees: InputExpectedEmployees
    home_address: InputBusinessAddress
    representative_full_name: String
    investor_id: String
    project_impl_plan: InputProjectImplementationPlan
    project_utilities: InputProjectUtility
    investment_costs: InputInvestmentCost
    expansion_documents: InputExpansionDocuments
    factors_influencing_plan: String
    how_to_avoid_problems: String
    support_needed_from_eic: String
    other_documents: String
    invesment_permit_id: String
    starting_date: Date
    ending_date: Date
    proposed_investment_capital: Float
  }

  type IAnticipatedProduct {
    name: String
    quantity: Float
    local_share_market: Float
    export_share_market: Float
    unit: String
    percentage_capacity_increased: Float
    percentage_unit_increased: Float
  }

  input InputAnticipatedProduct {
    name: String
    quantity: Float
    local_share_market: Float
    export_share_market: Float
    unit: String
    percentage_capacity_increased: Float
    percentage_unit_increased: Float
  }

  type IEmployeeCount {
    permanent_female_amount: Int
    temporary_female_amount: Int
    permanent_male_amount: Int
    temporary_male_amount: Int
  }

  input InputEmployeeCount {
    permanent_female_amount: Int!
    temporary_female_amount: Int!
    permanent_male_amount: Int!
    temporary_male_amount: Int!
  }

  type IExpectedEmployees {
    permanent_amount: Int
    temporary_amount: Int
  }

  input InputExpectedEmployees {
    permanent_amount: Int!
    temporary_amount: Int!
  }

  type IProjectImplementationPlan {
    project_devt_feasiblility_study: String
    land_acquisition: String
    building_civil_work: String
    public_utility_acquisition: IPublicUtilityAcquisition
    machinery_procurement_purchase: String
    reaching_of_machinery_at_project_site: String
    work_permit_for_technician: String
    machinery_erection_installation: String
    preparation_of_raw_material: String
    co_missing_machines_and_make_ready_for_operator: String
    common_cement_of_product_service: String
    other: String
  }

  input InputProjectImplementationPlan {
    project_devt_feasiblility_study: String
    land_acquisition: String
    building_civil_work: String
    public_utility_acquisition: InputPublicUtilityAcquisition
    machinery_procurement_purchase: String
    reaching_of_machinery_at_project_site: String
    work_permit_for_technician: String
    machinery_erection_installation: String
    preparation_of_raw_material: String
    co_missing_machines_and_make_ready_for_operator: String
    common_cement_of_product_service: String
    other: String
  }

  type IPublicUtilityAcquisition {
    electricity: String
    water: String
    telecom: String
    other: String
  }

  input InputPublicUtilityAcquisition {
    electricity: String
    water: String
    telecom: String
    other: String
  }

  type IProjectUtility {
    size_of_land_sqm: Float
    electrical_power_kw: Float
    water_m3: Float
    telecom_services_needed: String
    other_services: String
  }

  input InputProjectUtility {
    size_of_land_sqm: Float
    electrical_power_kw: Float
    water_m3: Float
    telecom_services_needed: String
    other_services: String
  }

  type IInvestmentCost {
    land: Float
    building: Float
    working_capital: Float
    machinery: Float
    material: Float
    other_costs: Float
  }

  input InputInvestmentCost {
    land: Float
    building: Float
    working_capital: Float
    machinery: Float
    material: Float
    other_costs: Float
  }

  type IExpansionDocuments {
    copy_of_business_license: String
    financial_statement: String
    feasibility_study: String
    list_of_capital_good_and_raw_materials: String
    land_lice_agreement: String
  }

  input InputExpansionDocuments {
    copy_of_business_license: String!
    financial_statement: String!
    feasibility_study: String!
    list_of_capital_good_and_raw_materials: String!
    land_lice_agreement: String!
  }

`