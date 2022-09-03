import { Model, Document } from "mongoose"

export interface IValidationInput {
  rules: { [key: string]: string },
  data: { [key: string]: any },
  model?: Model<Document>
}

export interface IValidationErrorMessage {
  __typename: string,
  error_path: string,
  errors: IError[]
}

export interface IError {
  error_message: string,
  error_code: number,
}

export interface IValidationErrors {
  __typename: string,
  validation_errors: IValidationError[]
}

export interface IValidationError {
  error_path: string,
  errors: IError[],
}

export interface IError {
  error_message: string,
  error_code: number,
}