import { Schema, model } from "mongoose"
import { Units } from "../../Common/enums";

const productSchema = new Schema({
  product_name: {
    type: String, required: true
  },
  is_service: {
    type: Boolean, required: true
  },
  quantity: {
    type: Number, required: true
  },
  unit: {
    type: String, required: true, enum: Units
  },
  domestic_market_share: {
    type: Number, required: true
  },
  export_market_share: {
    type: Number, required: true
  }
}, { timestamps: true })

export const ProductModel = model("product", productSchema)