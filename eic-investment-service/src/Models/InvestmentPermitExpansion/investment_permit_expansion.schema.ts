import { Schema, model } from "mongoose"
import { InvestmentPermitStatus } from "../InvestmentPermit/investment_permit.types"

const investmentPermitSchema = new Schema({
  company_name: {
    type: String, required: true
  },
  company_name_amharic: {
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
  company_address: {
    type: Object, required: true
  },
  company_expansion_address: {
    type: Object, required: true
  },
  investment_costs: {
    type: Object, required: true
  },
  previous_employees: {
    type: Object, required: true
  },
  expected_employees: {
    type: Object, required: true
  },
  project_utilities: {
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
  project_description: {
    type: String, required: true
  },
  investment_address: {
    type: Object, required: true
  },
  land_size_sqm: {
    type: Number, required: true
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
  current_products: [
    {
      type: Object, default: []
    }
  ],
  anticipated_products: [
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
  start_date: {
    type: Date, required: false
  },
  end_date: {
    type: Date, required: false
  },
  project_impl_plan: {
    type: Object, required: false
  },
  expansion_documents: {
    type: Object, required: false
  },
  factors_influencing_plan: {
    type: String, required: false
  },
  how_to_avoid_problems: {
    type: String, required: false
  },
  support_needed_from_eic: {
    type: String, required: false
  },
  other_documents: {
    type: String, required: false
  },
  invesment_permit_id: {
    type: String, required: false
  },
  proposed_investment_capital: {
    type: Number, required: false
  },
  starting_date :{
    type: Date, required: false
  },
  ending_date: {
    type: Date, required: false
  },
  ref_number: {
    type: String, required: false
  }
}, { timestamps: true })

export const InvestmentPermitExpansionModel = model("investment_permit_expansions", investmentPermitSchema)