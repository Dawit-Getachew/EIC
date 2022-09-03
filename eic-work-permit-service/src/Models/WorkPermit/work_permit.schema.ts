import { model, Schema } from "mongoose"
import { PermitStatus } from "./work_permit.types"

const workPermitSchema = new Schema({
  company_name: {
    type: String, unique: false, required: true,
  },
  company_name_amharic: {
    type: String, unique: false, required: false, default: ""
  },
  address: {
    type: Object, unique: false, required: true
  },
  country_of_incorporation: {
    type: String, unique: false, required: true,
  },
  business_activity: {
    type: String, unique: false, required: true,
  },
  business_location: {
    type: String, unique: false, required: true,
  },
  permit_status: {
    type: String, enum: PermitStatus, required: true, default: PermitStatus.DRAFTED
  },
  capital_of_enterprise: {
    type: String, unique: false, required: true,
  },
  investment_permit_license_number: {
    type: String, unique: false, required: true,
  },
  date_of_issuance: {
    type: Date, unique: false, required: true,
  },
  tin_number: {
    type: String, unique: false, required: true
  },
  business_license_number: {
    type: String, unique: false, required: true, default: ""
  },
  business_license_date_of_issuance: {
    type: String, unique: false, default: ""
  },
  expansion_license_number: {
    type: String, unique: false, required: true, default: ""
  },
  expansion_license_date_of_issuance: {
    type: String, unique: false, defult: ""
  },
  current_total_number_of_expats: {
    type: Number, required: true, unique: false
  },
  current_total_number_of_expansion: {
    type: Number, required: true, unique: false
  },
  current_number_of_permanent_eth_employees: {
    type: Number, required: true, unique: false
  },
  current_number_of_holding_eth_management_posts: {
    type: Number, required: true, unique: false
  },
  bio_data_expat_information: {
    type: Object, unique: false, required: true
  },
  replacement_employees: [{
    type: Object, unique: false, required: false
  }],
  certification: {
    type: Object, unique: false, required: true
  },
  permit_documents: {
    type: Object, unique: false, required: true
  },
  service_id: {
    type: String, unique: false, required: true
  },
  service_fee: {
    type: String, unique: false, required: false, default: ""
  },
  isAssigned: {
    type: Boolean, unique: false, required: false, default: false
  },
  assignedTo: {
    type: Object, unique: false, required: false, default: {}
  },
  document_number: {
    type: String, required: true, unique: true
  }
}, { timestamps: true })

export const WorkPermitModel = model("work_permit_docs", workPermitSchema)