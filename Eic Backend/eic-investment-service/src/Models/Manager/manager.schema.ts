import { Schema, model } from "mongoose"

const managerSchema = new Schema({
  first_name: {
    type: String, required: true
  },
  middle_name: {
    type: String, required: true
  },
  last_name: {
    type: String, required: true
  },
  address: {
    type: Object, required: true
  }
}, { timestamps: true })

export const ManagerModel = model("manager", managerSchema)