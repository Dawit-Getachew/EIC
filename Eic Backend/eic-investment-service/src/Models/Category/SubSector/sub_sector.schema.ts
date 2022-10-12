import { Schema, model } from "mongoose"

const subSectorSchema = new Schema({
  name: {
    type: String, required: true
  },
  sector: {
    type: Schema.Types.ObjectId, required: true, refs: "category_sector"
  }
}, { timestamps: true })

export const SubSectorModel = model("category_sub_sector", subSectorSchema)