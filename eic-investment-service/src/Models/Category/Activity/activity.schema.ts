import { Schema, model } from "mongoose"

const activitySchema = new Schema({
  name: {
    type: String, required: true
  },
  sub_sector: {
    type: Schema.Types.ObjectId, required: true, refs: "category_sub_sector"
  }
}, { timestamps: true })

export const ActivityModel = model("category_activity", activitySchema)