import { Schema, model } from "mongoose"
import { InvestmentPermitStatus } from "./investment_permit.types"

const investmentPermitSchema = new Schema({
  ref_number: {
    type: String, required: true,
  },
  registration_number: {
    type: String, required: false, default: ""
  },
  tin_number: {
    type: String, required: false, default: ""
  },
  company_name: {
    type: String, required: true
  },
  company_name_amharic: {
    type: String, required: true
  },
  trade_name: {
    type: String, required: true
  },
  trade_name_amharic: {
    type: String, required: true
  },
  investor_nationality: {
    type: String, required: true
  },
  type_of_business: {
    type: String, required: true
  },
  type_of_ownership: {
    type: String, required: true
  },
  shareholders: [{
    type: Object, required: true
  }],
  manager_full_name: {
    type: String, required: true
  },
  manager_full_name_amharic: {
    type: String, required: true
  },
  company_address: {
    type: Object, required: true
  },
  representative_address: {
    type: Object, required: true
  },
  sector: {
    type: String, required: true
  },
  investment_activity: {
    type: String, required: true
  },
  investment_activity_amharic: {
    type: String, required: true
  },
  project_description: {
    type: String, required: true
  },
  investment_address: {
    type: Object, required: true
  },
  land_size_sqm: {
    type: Number, required: true
  },
  land_acquisition_type: {
    type: String, required: true
  },
  investment_capital_usd: {
    type: Number, required: true
  },
  investment_capital_birr: {
    type: Number, required: true
  },
  permit_status: {
    type: String, enum: InvestmentPermitStatus, default: InvestmentPermitStatus.ACCEPTED
  },
  permit_documents: {
    type: Object
  },
  products: [
    {
      type: Object, default: []
    }
  ],
  raw_materials: [
    {
      type: Object, default: []
    }
  ],
  heard_from: {
    type: String, required: false, default: ""
  },
  enviromental_impact: {
    type: String, required: false, default: ""
  },
  market_destination_local_amount: {
    type: Number, required: false, default: 0
  },
  market_destination_export_amount: {
    type: Number, required: false, default: 0
  },
  equity: {
    type: Number, required: false, default: 0
  },
  loan: {
    type: Number, required: false, default: 0
  },
  number_of_employees: {
    type: Number, required: false, default: 0
  },
  representative_full_name: {
    type: String, required: false, default: ""
  },
  home_address: {
    type: Object, required: true
  },
  investor_id: {
    type: String, required: false, default: ""
  },
  company_registration_form: {
    type: String, required: false, default: ""
  },
  company_registration_bank_slip_form: {
    type: String, required: false, default: ""
  },
  memorandum_bank_slip_form: {
    type: String, required: false, default: ""
  },
  credit_service_bank_slip_form: {
    type: String, required: false, default: ""
  },
  service_fee_bank_slip_form: {
    type: String, required: false, default: ""
  },
  memorandum_of_association: {
    type: String, required: false, default: ""
  },
  edited_name: {
    type: String, required: false, default: ""
  },
  edited_name_amharic: {
    type: String, required: false, default: ""
  },
  edited_trade_name: {
    type: String, required: false, default: ""
  },
  edited_trade_name_amharic: {
    type: String, required: false, default: ""
  },
  employee_information: {
    type: Object, required: false, default: {}
  },
  selected_bank: {
    type: String, required: false, default: ""
  },
  isAssigned: {
    type: Boolean, unique: false, required: false, default: false
  },
  assignedTo: {
    type: Object, unique: false, required: false, default: {}
  },
  capital_registration: {
    type: Object, required: false, default: null
  },
  draft_minutes: {
    type: String, required: false, default: ""
  }
}, { timestamps: true })

export const InvestmentPermitModel = model("investment_permit", investmentPermitSchema)