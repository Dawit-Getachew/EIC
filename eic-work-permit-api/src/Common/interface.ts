import { Schema } from "mongoose"

export interface IBasicDoc {
  _id: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
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

export interface GQLInputFilter {
  input: {
    pagination: {
      limit: number
      offset: number
    }
  }
}

export enum IRoleAccount {
  CASE_WORKER = "CASE_WORKER",
  TEAM_LEADER = "TEAM_LEADER",
  DIRECTOR = "DIRECTOR"
}