import { gql } from "apollo-server-express"
import { InvestmentPermitActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchAdminWorks, fetchAssigned, fetchUnAssigned, fetchMyPermits },
  Mutation: { edit, post, removeAll, removeMany, removeOne, assignToAdmins }
} = InvestmentPermitActions

export default gql`
  extend type Query {
    ${fetchAll}: [IInvestmentPermit]
    ${fetchOneByID}(_id: ID!): IInvestmentPermit
    ${fetchManyByID}(_ids: [ID!]!): [IInvestmentPermit]
    ${fetchAdminWorks}(input: InputAdminWorks!): [IInvestmentPermit]
    ${fetchUnAssigned}: [IInvestmentPermit]
    ${fetchAssigned}: [IInvestmentPermit]
    ${fetchMyPermits}(_id: String!): [IInvestmentPermit]
  }
  extend type Mutation {
    ${post}(input: IInvestmentPermitInput): IInvestmentPermitResponse
    ${edit}(input: IInvestmentPermitEdit): IInvestmentPermitResponse
    ${removeOne}(_id: ID!): IInvestmentPermit
    ${removeMany}(_ids: [ID!]!): [IInvestmentPermit]
    ${removeAll}: String
    ${assignToAdmins}(input: IAssignWorkToAdmin): IInvestmentPermitResponse
  }
  union IInvestmentPermitResponse = IInvestmentPermitSimple | SystemError | ValidationError | ValidationErrors
  type IInvestmentPermit {
    _id: ID
    ref_number: String
    registration_number: String
    tin_number: String
    company_name_amharic: String
    company_name: String
    trade_name: String
    trade_name_amharic: String
    investor_nationality: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [IShareHolder]
    manager_full_name: String
    manager_full_name_amharic: String
    company_address: IBusinessAddress
    representative_address: IBusinessAddress
    sector: String
    investment_activity: String
    investment_activity_amharic: String
    project_description: String
    investment_address: IBusinessAddress
    land_size_sqm: Float
    land_acquisition_type: String
    investment_capital_usd: Float
    investment_capital_birr: Float
    permit_status: InvestmentPermitStatus
    permit_documents: IPermitDocument
    products: [IPermitProduct]
    raw_materials: [IPermitRawMaterial]
    heard_from: String
    enviromental_impact: String
    market_destination_local_amount: Float
    market_destination_export_amount: Float
    equity: Float
    loan: Float
    number_of_employees: Float
    home_address: IBusinessAddress
    representative_full_name: String
    investor_id: String
    company_registration_form: String
    company_registration_bank_slip_form: String
    memorandum_bank_slip_form: String
    credit_service_bank_slip_form: String
    memorandum_of_association: String
    service_fee_bank_slip_form: String
    edited_name: String
    edited_name_amharic: String
    edited_trade_name: String
    edited_trade_name_amharic: String
    employee_information: IEmployeeCount
    selected_bank: String
    isAssigned: Boolean
    assignedTo: IAssignAdmin
    document_number: String
    capital_registration: ICapitalRegistration
    draft_minutes: String
    createdAt: Date
    updatedAt: Date
  }
  type IPermitDocument {
    power_of_attorney: String
    investment_visa_for_foreigners: String
    notarized_minutes_of_resolution: String
    passport: String
    project_proposal: String
    certificate_of_incorporation: String
    memorandum_and_articles_of_association: String
    business_background: String
  }
  type IPermitRawMaterial {
    name: String
    quantity: Float
    local_source: Float
    import_source: Float
    unit: String
  }
  input InputPermitRawMaterial {
    name: String!
    quantity: Float!
    local_source: Float!
    import_source: Float!
    unit: String!
  }
  input InputPermitDocument {
    power_of_attorney: String!
    investment_visa_for_foreigners: String!
    notarized_minutes_of_resolution: String!
    passport: String!
    project_proposal: String!
    certificate_of_incorporation: String!
    memorandum_and_articles_of_association: String!
    business_background: String!
  }
  type ICapitalRegistration {
    amount_in_birr: Float
    amount_in_dollar: Float
  }
  type IInvestmentPermitSimple {
    _id: ID
    company_name: String
    ref_number: String
    registration_number: String
    tin_number: String
    company_name_amharic: String
    trade_name: String
    trade_name_amharic: String
    investor_nationality: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [IShareHolder]
    manager_full_name: String
    manager_full_name_amharic: String
    company_address: IBusinessAddress
    representative_address: IBusinessAddress
    sector: String
    investment_activity: String
    investment_activity_amharic: String
    project_description: String
    investment_address: IBusinessAddress
    land_size_sqm: Float
    land_acquisition_type: String
    investment_capital_usd: Float
    investment_capital_birr: Float
    permit_status: InvestmentPermitStatus
    permit_documents: IPermitDocument
    products: [IPermitProduct]
    raw_materials: [IPermitRawMaterial]
    heard_from: String
    enviromental_impact: String
    market_destination_local_amount: Float
    market_destination_export_amount: Float
    equity: Float
    loan: Float
    number_of_employees: Float
    home_address: IBusinessAddress
    representative_full_name: String
    investor_id: String
    company_registration_form: String
    company_registration_bank_slip_form: String
    memorandum_bank_slip_form: String
    credit_service_bank_slip_form: String
    memorandum_of_association: String
    service_fee_bank_slip_form: String
    edited_name: String
    edited_name_amharic: String
    edited_trade_name: String
    edited_trade_name_amharic: String
    employee_information: IEmployeeCount
    selected_bank: String
    isAssigned: Boolean
    assignedTo: IAssignAdmin
    document_number: String
    capital_registration: ICapitalRegistration
    draft_minutes: String
    createdAt: Date
    updatedAt: Date
  }  

  input IInvestmentPermitInput {
    company_name: String!
    company_name_amharic: String!
    trade_name: String!
    trade_name_amharic: String!
    investor_nationality: String!
    type_of_business: String!
    type_of_ownership: String!
    shareholders: [InputShareHolder]!
    manager_full_name: String!
    manager_full_name_amharic: String!
    company_address: InputBusinessAddress!
    representative_address: InputBusinessAddress!
    sector: String!
    investment_activity: String!
    investment_activity_amharic: String!
    project_description: String!
    investment_address: InputBusinessAddress!
    land_size_sqm: Float!
    land_acquisition_type: String!
    investment_capital_usd: Float!
    investment_capital_birr: Float!
    permit_documents: InputPermitDocument!
    products: [InputPermitProduct]!
    raw_materials: [InputPermitRawMaterial]!
    heard_from: String!
    enviromental_impact: String!
    market_destination_local_amount: Float!
    market_destination_export_amount: Float!
    equity: Float!
    loan: Float!
    number_of_employees: Float!
    home_address: InputBusinessAddress!
    representative_full_name: String!
    investor_id: String!
    employee_information: InputEmployeeCount!
  }

  input IInvestmentPermitEdit {
    _id: ID!
    registration_number: String
    tin_number: String
    trade_name: String
    trade_name_amharic: String
    company_name: String
    company_name_amharic: String
    type_of_business: String
    type_of_ownership: String
    shareholders: [InputShareHolder]
    manager_full_name: String
    manager_full_name_amharic: String
    company_address: InputBusinessAddress
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
    raw_materials: [InputPermitRawMaterial]
    heard_from: String
    enviromental_impact: String
    market_destination_local_amount: Float
    market_destination_export_amount: Float
    equity: Float
    loan: Float
    number_of_employees: Float
    home_address: InputBusinessAddress
    representative_full_name: String
    investor_id: String
    company_registration_form: String
    company_registration_bank_slip_form: String
    memorandum_bank_slip_form: String
    credit_service_bank_slip_form: String
    memorandum_of_association: String
    service_fee_bank_slip_form: String
    edited_name: String
    edited_name_amharic: String
    edited_trade_name: String
    edited_trade_name_amharic: String
    employee_information: InputEmployeeCount
    selected_bank: String
    investor_nationality: String
    investment_activity_amharic: String
    land_acquisition_type: String
    isAssigned: Boolean
    assignedTo: InputAssignAdmin
    document_number: String
    capital_registration: InputCapitalRegistration
    draft_minutes: String
  }
  input InputCapitalRegistration {
    amount_in_birr: Float!
    amount_in_dollar: Float!
  }
  type IShareHolder {
    name: String
    nationality: String
    country_of_incorporation: String
    address: String
  }
  input InputShareHolder {
    name: String
    nationality: String
    country_of_incorporation: String
    address: String
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