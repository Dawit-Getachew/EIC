import { InvestmentPermitStatus } from "../../Models/InvestmentPermit/investment_permit.types";
import { Schema, model } from "mongoose"

const investmentPermitAmmendmentSchema = new Schema({
  investment_id: {
    type: Schema.Types.ObjectId, required: true
  },
  permit_status: {
    type: String, required: true, enum: InvestmentPermitStatus, default: InvestmentPermitStatus.REVIEWED
  },
  service_id: {
    type: String, required: true
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
  investment_capital_usd: {
    type: Number, required: true
  },
  investment_capital_birr: {
    type: Number, required: true
  }
}, { timestamps: true })

export const InvestmentPermitAmmendmentModel = model("investment_permit_ammendment", investmentPermitAmmendmentSchema)