import { IBasicDoc, IBasicDocument, IBasicID, IBasicIDs, IBusinessAddress } from "src/common/interface"
import { PermitStatus } from '../WorkPermitApplications/types'

export const GQLResponseTag = "ICancelWorkPermitSimple"

export interface ICancelWorkPermitResolver {
  Query: ICancelWorkPermitQuery
  Mutation: ICancelWorkPermitMutation
}

export interface ICancelWorkPermitQuery {
  fetchCancelWorkPermits: (parent: any, args: any, context: any) => Promise<ICancelWorkPermitDoc<ICancelWorkPermit[]>>
  fetchOneCancelWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<ICancelWorkPermitDoc<ICancelWorkPermit>>
  fetchManyCancelWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<ICancelWorkPermitDoc<ICancelWorkPermit[]>>
}

export interface ICancelWorkPermitMutation {
  postCancelWorkPermit: (parent: any, args: IPostCancelWorkPermit, context: any) => Promise<ICancelWorkPermitDoc<ICancelWorkPermit>>
  editCancelWorkPermit: (parent: any, args: IEditCancelWorkPermit, context: any) => Promise<ICancelWorkPermitDoc<ICancelWorkPermit>>
  removeOneCancelWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<ICancelWorkPermitDoc<ICancelWorkPermit>>
  removeManyCancelWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<ICancelWorkPermitDoc<ICancelWorkPermit[]>>
  removeAllCancelWorkPermits: (parent: any, args: any, context: any) => Promise<ICancelWorkPermitDoc<string>>
}

export interface ICancelWorkPermit extends IBasicDoc {
  work_permit_id: string;
  service_id: string;
  permit_status: PermitStatus;
  reason_type: ICancelReasonType;
}

export interface ICancelWorkPermitDoc<IDataType> extends IBasicDocument<IDataType> {}


export interface ICancelWorkPermitInput {
  work_permit_id: string;
  service_id: string;
  reason_type: ICancelReasonType;
}


export interface ICancelWorkPermitEdit {
  _id: string
  work_permit_id?: string;
  service_id?: string;
  permit_status?: PermitStatus;
  reason_type?: ICancelReasonType;
}

export interface IPostCancelWorkPermit {
  input: ICancelWorkPermitInput
}

export interface IEditCancelWorkPermit {
  input: ICancelWorkPermitEdit
}

export enum ICancelReasonType {
  LOST = "LOST",
  DAMAGED = "DAMAGED"
}