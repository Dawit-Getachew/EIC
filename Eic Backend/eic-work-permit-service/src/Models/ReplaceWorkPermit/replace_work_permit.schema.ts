import { model, Schema, ObjectId } from "mongoose"
import { PermitStatus } from "../WorkPermit/work_permit.types"
import { IReplaceReasonType } from "./replace_work_permit.types"

const replaceWorkPermitSchema = new Schema({
  work_permit_id: {
    type: Schema.Types.ObjectId, required: true
  },
  service_id: {
    type: String, required: true
  },
  reason_type: {
    type: String, required: true, enum: IReplaceReasonType
  },
  police_report: {
    type: String, required: false, default: ""
  },
  passport_image: {
    type: String, required: false, default: ""
  },
  damaged_permit: {
    type: String, required: false, default: ""
  },
  permit_status: {
    type: String, enum: PermitStatus, required: true, default: PermitStatus.REVIEWED
  },
}, { timestamps: true })

export const ReplaceWorkPermitModel = model("replace_work_permit_docs", replaceWorkPermitSchema)