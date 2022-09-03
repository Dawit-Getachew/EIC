import { Schema, model } from "mongoose"

const sectorSchema = new Schema({
  name: {
    type: String, required: true
  }
}, { timestamps: true })

export const SectorModel = model("category_sector", sectorSchema)