export interface ErrorType {
  type: number;
  message: string;
}

export interface IUserID {
  _id: string;
}

export interface IAddress {
  city: string
  sub_city: string
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum DayName {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}


export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Bank {
  AWASH_INTERNATIONAL_BANK = "AWASH_INTERNATIONAL_BANK",
  COMMERCIAL_BANK_OF_ETHIOPIA = "COMMERCIAL_BANK_OF_ETHIOPIA",
}

export enum ReferalStatus {
  CLAIMED = "CLAIMED",
  UNCLAIMED = "UNCLAIMED",
}

export enum WorkPriority {
  PRICE = "PRICE",
  TIME = "TIME"
}

export enum MatchType {
  "BROKER" = "BROKER",
  "VERIFIED_BROKER" = "VERIFIED_BROKER",
  "VERIFIED_COMBINATION_USER" = "VERIFIED_COMBINATION_USER",
  "COMBINATION_USER" = "COMBINATION_USER",
}