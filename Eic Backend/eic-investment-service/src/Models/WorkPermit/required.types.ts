import { CurrencyTypes } from "../../Common/enums";

export interface IEmployeeCount {
  local_female_amount: number
  foreign_female_amount: number
  local_male_amount: number
  foreign_male_amount: number
}

export interface IRawMaterial {
  raw_material_name: string
  is_local: boolean
  remarks: string
}

export interface IProjectShare {
  share_holder_name: string
  nationality: string
  quantity: number
  share_percent: number
  description: string
}

export interface IPermitDocument {
  renewed_id_image: string
  passport_image: string
}

export interface IProjectInput {
  electric_power: number
  water_in_sqm: number
  agricultural_land_in_sqm: number
  land_service_in_sqm: number
  rental_land_in_sqm: number
  other_utility: number
  own_land_in_sqm: number
  land_industrial_in_sqm: number
  lease_land_in_sqm: number
  remarks: string
}

export interface IProjectCost {
  building_cost_foreign: number
  machine_cost_foreign: number
  initial_working_capital_cost_foreign: number
  other_capital_cost_foreign: number
  transport_cost_foreign: number
  office_equipment_cost_foreign: number
  total_cost_foreign: number
  building_cost_birr: number
  machine_cost_birr: number
  office_equipment_cost_birr: number
  transport_cost_birr: number
  other_capital_cost_birr: number
  initial_working_capital_cost_birr: number
  toal_cost_birr: number
  equity_finance: number
  loan_finance: number
  other_source_finance: number
  other_source_description: string
  currency_type: CurrencyTypes
  actual_cost_of_foreign: number
  etb_exchange_rate: number
  remarks: string
}