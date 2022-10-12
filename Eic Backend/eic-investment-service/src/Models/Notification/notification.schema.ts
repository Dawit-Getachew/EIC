import { Schema, model } from "mongoose"

const notificationSchema = new Schema({
  title: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  icon: {
    type: String, required: true
  },
  is_read: {
    type: Boolean, required: true, default: false
  },
  service_id: {
    type: String, required: true
  }
}, { timestamps: true })

export const NotificationModel = model("notifications", notificationSchema)