import { InvestmentPermitStatus } from "../../Models/InvestmentPermit/investment_permit.types"
import { Schema, model } from "mongoose"

const investmentPermitCancellationSchema = new Schema({
  investment_id: {
    type: Schema.Types.ObjectId, required: true
  },
  permit_status: {
    type: String, required: false, default: InvestmentPermitStatus.REVIEWED
  },
  project_status: [{
    type: String, required: false
  }],
  problems_encountered: {
    type: String, required: true
  },
  cancellation_document: {
    type: String, required: true
  },
  has_duty_free: {
    type: Boolean, required: true
  },
  duty_free_content: {
    type: String, required: true
  },
  service_id: {
    type: String, required: true
  }
}, { timestamps: true })

export const InvestmentPermitCancellationModel = model("investment_permit_cancellaions", investmentPermitCancellationSchema)