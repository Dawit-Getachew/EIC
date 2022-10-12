import { Model, Document } from "mongoose"

interface ExistsValidatorResponse {
  success: boolean
  message: string | null
}

export const ExistsValidator = async (model: Model<Document>, tagValue: string, value: string): Promise<ExistsValidatorResponse> => {
  const foundValue = await model.findOne({ [tagValue]: value }).exec()
  return foundValue? { success: false, message: `${value} already exists` } : { success: true, message: null }
}