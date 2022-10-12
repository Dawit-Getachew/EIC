import { model, Schema, ObjectId } from "mongoose"
import { PermitStatus } from "../WorkPermit/work_permit.types"

const renewWorkPermitSchema = new Schema({
  work_permit_id: {
    type: Schema.Types.ObjectId, required: true
  },
  service_id: {
    type: String, required: true
  },
  tranining_document: {
    type: String, required: true
  },
  permit_status: {
    type: String, enum: PermitStatus, required: true, default: PermitStatus.REVIEWED
  },
}, { timestamps: true })

export const RenewWorkPermitModel = model("renew_work_permit_docs", renewWorkPermitSchema)