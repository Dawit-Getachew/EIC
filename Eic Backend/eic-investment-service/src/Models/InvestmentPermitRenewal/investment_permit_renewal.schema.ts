import { InvestmentPermitStatus } from "../../Models/InvestmentPermit/investment_permit.types"
import { Schema, model } from "mongoose"

const investmentPermitRenewalSchema = new Schema({
  investment_id: {
    type: Schema.Types.ObjectId, required: true
  },
  project_status: [{
    type: String, required: false, default: []
  }],
  problems_encountered: {
    type: String, required: false,
  },
  date_of_commencement: {
    type: Date, required: false
  },
  permit_status: {
    type: String, required: false, default: InvestmentPermitStatus.REVIEWED
  },
  service_id: {
    type: String, required: true
  }
}, { timestamps: true })

export const InvestmentPermitRenewalModel = model("investment_permit_renewals", investmentPermitRenewalSchema)