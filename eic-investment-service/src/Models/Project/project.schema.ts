import { Schema, model } from "mongoose"
import { ProjectStages } from "./project.types"

const projectSchema = new Schema({
  title: {
    type: String, required: true
  },
  project_stage: {
    type: String, required: true, enum: ProjectStages
  },
  environmental_impact: {
    type: String, required: true
  },
  project_summary: {
    type: String, required: true
  },
  address: {
    type: Object, required: true
  },
  category_sector: {
    type: Schema.Types.ObjectId, required: true, refs: "category_sector"
  },
  category_sub_sector: {
    type: Schema.Types.ObjectId, required: true, refs: "category_sub_sector"
  },
  category_activity: {
    type: Schema.Types.ObjectId, required: true, refs: "category_activity"
  },
  category_investment_activity: {
    type: Schema.Types.ObjectId, required: true, refs: "category_investment_activity"
  },
  
}, { timestamps: true })

export const ProjectModel = model("project", projectSchema)