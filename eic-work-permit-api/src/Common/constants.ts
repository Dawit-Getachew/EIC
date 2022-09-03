export const ErrorTypes = {
  "ValidationError": "ValidationError",
  "SystemError": "SystemError"
}

export interface ValidationError {
  __typename: string;
  errors: ErrorType[];
  error_path: string;
}

export interface ErrorType {
  error_code: ErrorCodes;
  error_message: string;
}

export enum ErrorCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  ENTITY_EXISTS = 403
}

export interface SystemError extends ErrorType {
  __typename: string
}

export enum AdminRoles {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  TESTING = "TESTING",
  INSPECTOR = "INSPECTOR",
  CASE_WORKER = "CASE_WORKER",
  TEAM_LEADER = "TEAM_LEADER",
  DIRECTOR = "DIRECTOR"
}

export enum Role {
  "ADMIN" = "ADMIN",
  "USER" = "USER",
  "TESTING" = "TESTING",
  "PUBLIC_USER" = "PUBLIC_USER",
}