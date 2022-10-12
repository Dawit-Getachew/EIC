import { model, Schema } from "mongoose"
import { PermitStatus } from "../WorkPermit/work_permit.types"

const cancelWorkPermitSchema = new Schema({
  work_permit_id: {
    type: Schema.Types.ObjectId, required: true
  },
  service_id: {
    type: String, required: true
  },
  reason_type: {
    type: String, required: true,
  },
  permit_status: {
    type: String, enum: PermitStatus, required: true, default: PermitStatus.REVIEWED
  },
}, { timestamps: true })

export const CancelWorkPermitModel = model("cancel_work_permit_docs", cancelWorkPermitSchema)