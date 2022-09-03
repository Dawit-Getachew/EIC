export enum IBasicDBAction {
  CREATE = "CREATE",
  FETCH = "FETCH",
  EDIT = "EDIT",
  REMOVE = "REMOVE"
}

export enum IBasicStatus {
  SUCCESS = 200,
  BAD_ARGS = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export interface IBasicDocument<IDataType> {
  data: IDataType
  status: IBasicStatus
  action: IBasicDBAction
}

export interface ErrorType {
  error_code: IBasicStatus;
  error_message: string;
}

export interface SystemError extends ErrorType {
  __typename: string
}

export const ErrorTypes = {
  "ValidationError": "ValidationError",
  "SystemError": "SystemError"
}

export interface IPushItem {
  editValue: any
  editTag: string
  fetchValue: any
  fetchTag?: string
}

export interface IPushItems {
  editValues: any[]
  editTag: string
  fetchValue: any
  fetchTag?: string
}