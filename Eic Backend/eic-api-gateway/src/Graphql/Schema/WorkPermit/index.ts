import { gql } from "apollo-server-express"
import { WorkPermitActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = WorkPermitActions

export default gql`
  extend type Query {
    ${fetchAll}: [IWorkPermit]
    ${fetchOneByID}(_id: ID!): IWorkPermit
    ${fetchManyByID}(_ids: [ID!]!): [IWorkPermit]
  }

  extend type Mutation {
    ${post}(input: IWorkPermitInput): IWorkPermitResponse
    ${edit}(input: IWorkPermitEdit): IWorkPermitResponse
    ${removeOne}(_id: ID!): IWorkPermit
    ${removeMany}(_ids: [ID!]!): [IWorkPermit]
    ${removeAll}: String
  }

  union IWorkPermitResponse = IWorkPermitSimple | SystemError | ValidationError | ValidationErrors

  type IWorkPermit {
    _id: ID
    project: ID
    start_date: Date
    end_date: Date
    previous_permit_number: String
    project_input: ProjectInput
    raw_materials: [IRawMaterial]
    project_cost: IProjectCost
    permanent_employee_count: IWorkEmployeeCount
    temporary_employee_count: IWorkEmployeeCount
    project_shares: [IProjectShare]
    products: [ID]
    permit_documents: IWorkPermitDocument
    selected_manager: ID
    createdAt: Date
    updatedAt: Date
  }

  type IWorkPermitSimple {
    _id: ID
    project: ID
    start_date: Date
    end_date: Date
    previous_permit_number: String
    project_input: ProjectInput
    raw_materials: [IRawMaterial]
    project_cost: IProjectCost
    permanent_employee_count: IWorkEmployeeCount
    temporary_employee_count: IWorkEmployeeCount
    project_shares: [IProjectShare]
    products: [ID]
    permit_documents: IWorkPermitDocument
    selected_manager: ID
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IWorkPermitInput {
    project: ID!
    start_date: Date!
    end_date: Date!
    previous_permit_number: String!
    project_input: InputProjectInput!
    raw_materials: [InputRawMaterial]!
    project_cost: InputProjectCost!
    permanent_employee_count: InputWorkEmployeeCount!
    temporary_employee_count: InputWorkEmployeeCount!
    project_shares: [InputProjectShare]!
    products: [ID]!
    permit_documents: InputWorkPermitDocument!
    selected_manager: ID!
  }

  input IWorkPermitEdit {
    _id: ID!
    project: ID
    start_date: Date
    end_date: Date
    previous_permit_number: String
    project_input: InputProjectInput
    raw_materials: [InputRawMaterial]
    project_cost: InputProjectCost
    permanent_employee_count: InputWorkEmployeeCount
    temporary_employee_count: InputWorkEmployeeCount
    project_shares: [InputProjectShare]
    products: [ID]
    permit_documents: InputWorkPermitDocument
    selected_manager: ID
  }

  type ProjectInput {
    electric_power: Float
    water_in_sqm: Float
    agricultural_land_in_sqm: Float
    land_service_in_sqm: Float
    rental_land_in_sqm: Float
    other_utility: Float
    own_land_in_sqm: Float
    land_industrial_in_sqm: Float
    lease_land_in_sqm: Float
    remarks: String
  }

  input InputProjectInput {
    electric_power: Float!
    water_in_sqm: Float!
    agricultural_land_in_sqm: Float!
    land_service_in_sqm: Float!
    rental_land_in_sqm: Float!
    other_utility: Float!
    own_land_in_sqm: Float!
    land_industrial_in_sqm: Float!
    lease_land_in_sqm: Float!
    remarks: String
  }

  type IRawMaterial {
    raw_material_name: String
    is_local: Boolean
    remarks: String
  }

  input InputRawMaterial {
    raw_material_name: String!
    is_local: Boolean!
    remarks: String
  }

  type IProjectCost {
    building_cost_foreign: Float
    machine_cost_foreign: Float
    initial_working_capital_cost_foreign: Float
    other_capital_cost_foreign: Float
    transport_cost_foreign: Float
    office_equipment_cost_foreign: Float
    total_cost_foreign: Float
    building_cost_birr: Float
    machine_cost_birr: Float
    office_equipment_cost_birr: Float
    transport_cost_birr: Float
    other_capital_cost_birr: Float
    initial_working_capital_cost_birr: Float
    toal_cost_birr: Float
    equity_finance: Float
    loan_finance: Float
    other_source_finance: Float
    other_source_description: String
    currency_type: CurrencyTypes
    actual_cost_of_foreign: Float
    etb_exchange_rate: Float
    remarks: String
  }

  input InputProjectCost {
    building_cost_foreign: Float!
    machine_cost_foreign: Float!
    initial_working_capital_cost_foreign: Float!
    other_capital_cost_foreign: Float!
    transport_cost_foreign: Float!
    office_equipment_cost_foreign: Float!
    total_cost_foreign: Float!
    building_cost_birr: Float!
    machine_cost_birr: Float!
    office_equipment_cost_birr: Float!
    transport_cost_birr: Float!
    other_capital_cost_birr: Float!
    initial_working_capital_cost_birr: Float!
    toal_cost_birr: Float!
    equity_finance: Float!
    loan_finance: Float!
    other_source_finance: Float!
    other_source_description: String!
    currency_type: CurrencyTypes!
    actual_cost_of_foreign: Float!
    etb_exchange_rate: Float!
    remarks: String
  }

  type IWorkEmployeeCount {
    local_female_amount: Int
    foreign_female_amount: Int
    local_male_amount: Int
    foreign_male_amount: Int
  }

  input InputWorkEmployeeCount {
    local_female_amount: Int!
    foreign_female_amount: Int!
    local_male_amount: Int!
    foreign_male_amount: Int!
  }

  type IProjectShare {
    share_holder_name: String
    nationality: String
    quantity: Int
    share_percent: Float
    description: String
  }

  input InputProjectShare {
    share_holder_name: String!
    nationality: String!
    quantity: Int!
    share_percent: Float!
    description: String
  }

  type IWorkPermitDocument {
    renewed_id_image: String
    passport_image: String
  }

  input InputWorkPermitDocument {
    renewed_id_image: String!
    passport_image: String!
  }
`