import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "../../Common/interface";

export { IBasicID, IBasicIDs }

export const GQLResponseTag = "IBusinessProfileSimple"

export interface IBusinessProfileResolver {
  Query: IBusinessProfileQuery
  Mutation: IBusinessProfileMutation
}

export interface IBusinessProfileQuery {
  fetchBusinessProfiles: (parent: any, args: any, context: any) => Promise<IBusinessProfileDoc<IBusinessProfile[]>>
  fetchOneBusinessProfileByID: (parent: any, args: IBasicID, context: any) => Promise<IBusinessProfileDoc<IBusinessProfile>>
  fetchManyBusinessProfilesByID: (parent: any, args: IBasicIDs, context: any) => Promise<IBusinessProfileDoc<IBusinessProfile[]>>
}

export interface IBusinessProfileMutation {
  postBusinessProfile: (parent: any, args: IPostBusinessProfile, context: any) => Promise<IBusinessProfileDoc<IBusinessProfile>>
  editBusinessProfile: (parent: any, args: IEditBusinessProfile, context: any) => Promise<IBusinessProfileDoc<IBusinessProfile>>
  removeOneBusinessProfileByID: (parent: any, args: IBasicID, context: any) => Promise<IBusinessProfileDoc<IBusinessProfile>>
  removeManyBusinessProfilesByID: (parent: any, args: IBasicIDs, context: any) => Promise<IBusinessProfileDoc<IBusinessProfile[]>>
  removeAllBusinessProfiles: (parent: any, args: any, context: any) => Promise<IBusinessProfileDoc<string>>
}

export interface IBusinessProfile extends IBasicDoc {
  legal_status: LegalStatusTypes
  form_of_ownership: FormOfOwnerShipTypes
  company_of_incorporation: string
  company_name: string
  company_name_amharic: string
  address: IBusinessAddress
  tin_number: string
  registration_number: string
}

export interface IBusinessProfileDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IBusinessProfileInput {
  legal_status: LegalStatusTypes
  form_of_ownership: FormOfOwnerShipTypes
  company_of_incorporation: string
  company_name: string
  company_name_amharic: string
  address: IBusinessAddress
  tin_number: string
  registration_number: string
}


export interface IBusinessProfileEdit {
  _id: string
  legal_status?: LegalStatusTypes
  form_of_ownership?: FormOfOwnerShipTypes
  company_of_incorporation?:string
  company_name?: string
  company_name_amharic?: string
  address?: IBusinessAddress
  tin_number?: string
  registration_number?: string
}

export interface IPostBusinessProfile {
  input: IBusinessProfileInput
}

export interface IEditBusinessProfile {
  input: IBusinessProfileEdit
}

export enum LegalStatusTypes {
  Sole_Proprietorship = "Sole_Proprietorship",
  Private_Limited_Company = "Private_Limited_Company",
  Share_Company = "Share_Company",
  Public_Enterprise = "Public_Enterprise",
  Cooperative_Society = "Cooperative_Society"
}

export enum FormOfOwnerShipTypes {
  Domestic_Investor = "Domestic_Investor",
  Foreign_Investor = "Foreign_Investor",
  As_Domestic_Investor = "As_Domestic_Investor",
  Joint_Investment = "Joint_Investment",
  Branch = "Branch"
}