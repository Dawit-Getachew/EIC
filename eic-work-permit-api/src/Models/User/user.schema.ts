import { Role } from "../../Common/constants";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: Role },
  password: { type: String, required: true, },
  business_profile: { type: String, default: "" },
  is_active: { type: Boolean, default: false },
  service_id: { type: String, default: Math.random().toString() },
  country: { type: String, default: "", required: false },
  city: { type: String, default: "", required: false },
  phone_number_type: { type: String, default: "", required: false },
  profile_picture: { type: String, default: "", required: false },

}, { timestamps: true });

export const UserModel = mongoose.model("user", UserSchema);