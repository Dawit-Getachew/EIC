import { AdminRoles } from "../../Common/constants";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String, required: false, default: "" },
  last_name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: AdminRoles },
  password: { type: String, required: true, },
  is_active: { type: Boolean, default: false },
  service_id: { type: String, default: Math.random().toString() }
}, { timestamps: true });

export const AccountModel = mongoose.model("account", AccountSchema);