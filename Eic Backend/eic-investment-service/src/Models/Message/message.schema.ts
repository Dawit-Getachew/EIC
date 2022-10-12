import { Schema, model } from "mongoose"
import { SenderRole } from "./message.types"

const messageSchema = new Schema({
  from_user: {
    type: String, required: true,
  },
  to_user: {
    type: String, required: true,
  },
  content: {
    type: String, required: true,
  },
  sender_role: {
    type: String, enum: SenderRole, required: true
  },
  chatID: {
    type: String, required: true
  }
}, { timestamps: true })

export const MessageModel = model("messages", messageSchema)