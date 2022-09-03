export interface IBasicDoc {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBasicDocument<IDataType> {
  data: IDataType
  status: IBasicStatus
  action: IBasicDBAction
}

export interface IBasicID {
  _id: string;
}

export interface IBasicIDs {
  _ids: string[];
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
  country?: string
  city: string
  city_amharic: string
  sub_city: string
  sub_city_amharic: string
  region: string
  region_amharic: string
  zone: string
  zone_amharic: string
  wereda: string
  wereda_amharic: string
  house_number: string
  email: string
  telephone_direct: string
  telephone_mobile: string
  fax: string
  po_box: string
  other_address?: string
}

export interface IAddress {
  kebele: string
  city: string
  sub_city: string
}