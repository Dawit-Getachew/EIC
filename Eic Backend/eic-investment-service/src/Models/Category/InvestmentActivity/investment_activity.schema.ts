import { Schema, model } from "mongoose"

const investmentActivitySchema = new Schema({
  name: {
    type: String, required: true
  },
  activity: {
    type: Schema.Types.ObjectId, required: true, refs: "category_activity"
  }
}, { timestamps: true })

export const InvestmentActivityModel = model("category_investment_activity", investmentActivitySchema)