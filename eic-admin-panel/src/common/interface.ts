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
  region: string
  zone: string
  city: string
  sub_city: string
  house_number: string
  email: string
  telephone_direct: string
  telephone_mobile: string
  fax: string
  po_box: string
  other_address?: string
}

export interface IAddress {
  city: string
  sub_city: string
}

export enum IRoleAccount {
  CASE_WORKER = "CASE_WORKER",
  TEAM_LEADER = "TEAM_LEADER",
  DIRECTOR = "DIRECTOR"
}