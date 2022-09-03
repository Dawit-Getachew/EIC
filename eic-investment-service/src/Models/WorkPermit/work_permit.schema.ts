import { Schema, model } from "mongoose"

const workPermitSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId, required: true,
  },
  start_date: {
    type: Date, required: true
  },
  end_date: {
    type: Date, required: true
  },
  previous_permit_number: {
    type: String, required: true, default: ""
  },
  project_input: {
    type: Object, required: true
  },
  raw_materials: [{
    type: Object, required: true
  }],
  project_cost: {
    type: Object, required: true
  },
  permanent_employee_count: {
    type: Object, required: true
  },
  temporary_employee_count: {
    type: Object, required: true
  },
  project_shares: [{
    type: Object, required: true
  }],
  products: [{
    type: Schema.Types.ObjectId, required: true,
  }],
  permit_documents: {
    type: Object, required: true
  },
  selected_manager: {
    type: Schema.Types.ObjectId, required: true,
  }
}, { timestamps: true })

export const WorkPermitModel = model("work_permit", workPermitSchema)