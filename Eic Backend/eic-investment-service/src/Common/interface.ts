import { Schema } from "mongoose"

export interface IBasicDoc {
  _id: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  __typename: string;
  errors?: ErrorType[]
  error_path?: string;
}

export interface ErrorType {
  error_code: string;
  error_message: string;
}

export enum GQLErrorTypes {
  ValidationError = "ValidationError",
}

export interface IBasicDocument<IDataType> {
  data: IDataType
  status: IBasicStatus
  action: IBasicDBAction
}

export interface IBasicID {
  _id: Schema.Types.ObjectId;
}

export interface IBasicIDs {
  _ids: Schema.Types.ObjectId[];
}

export enum IBasicDBAction {
  CREATE = "CREATE",
  FETCH = "FETCH",
  EDIT = "EDIT",
  REMOVE = "REMOVE"
}

export enum IBasicStatus {
  SUCCESS = 200,
  BAD_ARGS = 400,
  NOT_FOUND = 404
}

export interface IRabbitMQServerMessage {
  route: string
  data: any
}

export interface IBusinessAddress {
  country: string
  region: string
  region_amharic: string
  zone: string
  zone_amharic: string
  wereda: string
  wereda_amharic: string
  city: string
  city_amharic: string
  sub_city: string
  sub_city_amharic: string
  house_number: string
  email: string
  telephone_direct: string
  telephone_mobile: string
  fax: string
  po_box: string
  other_address?: string
}

export interface IAddress {
  sub_city: string
  city: string
  kebele: string
}