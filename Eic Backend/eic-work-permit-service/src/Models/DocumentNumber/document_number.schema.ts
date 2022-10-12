import { model, Schema } from "mongoose"

const documentNumberSchema = new Schema({
  document_number: {
    type: String, required: true, unique: true
  },
  ref_number: {
    type: String, required: true, unique: true
  }
}, { timestamps: true })

export const DocumentNumberModel = model("document_numbers", documentNumberSchema)