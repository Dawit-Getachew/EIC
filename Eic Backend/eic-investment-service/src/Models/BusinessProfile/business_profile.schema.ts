import { Schema, model } from "mongoose"
import { LegalStatusTypes, FormOfOwnerShipTypes } from "./business_profile.types"

const businessProfileSchema = new Schema({
  legal_status: {
    type: String, enum: LegalStatusTypes, required: true,
  },
  form_of_ownership: {
    type: String, enum: FormOfOwnerShipTypes, required: true
  },
  company_of_incorporation: {
    type: String, required: true
  },
  company_name: {
    type: String, required: true
  },
  company_name_amharic: {
    type: String, required: true
  },
  address: {
    type: Object, required: true
  },
  tin_number: {
    type: String, required: true
  },
  registration_number: {
    type: String, required: true
  }
}, { timestamps: true })

export const BusinessProfileModel = model("business_profile", businessProfileSchema)