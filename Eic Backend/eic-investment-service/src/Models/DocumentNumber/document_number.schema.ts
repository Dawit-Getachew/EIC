import { Schema, model } from "mongoose"

const sample = "EIC-IP6244/04"

const documentNumberSchema = new Schema({
  type: {
    type: String, required: false, default: "IP"
  },
  value: {
    type: String, required: true
  }
}, { timestamps: true })

export const DocumentNumberModel = model("document_numbers", documentNumberSchema)