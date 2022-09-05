/* eslint-disable*/

import { IBasicDoc, IBasicDocument, IBasicID, IBasicIDs, IBusinessAddress } from "src/common/interface"
import { PermitStatus } from '../WorkPermitApplications/types'

export const GQLResponseTag = "IReplaceWorkPermitSimple"

export interface IReplaceWorkPermitResolver {
  Query: IReplaceWorkPermitQuery
  Mutation: IReplaceWorkPermitMutation
}

export interface IReplaceWorkPermitQuery {
  fetchReplaceWorkPermits: (parent: any, args: any, context: any) => Promise<IReplaceWorkPermitDoc<IReplaceWorkPermit[]>>
  fetchOneReplaceWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IReplaceWorkPermitDoc<IReplaceWorkPermit>>
  fetchManyReplaceWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IReplaceWorkPermitDoc<IReplaceWorkPermit[]>>
}

export interface IReplaceWorkPermitMutation {
  postReplaceWorkPermit: (parent: any, args: IPostReplaceWorkPermit, context: any) => Promise<IReplaceWorkPermitDoc<IReplaceWorkPermit>>
  editReplaceWorkPermit: (parent: any, args: IEditReplaceWorkPermit, context: any) => Promise<IReplaceWorkPermitDoc<IReplaceWorkPermit>>
  removeOneReplaceWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IReplaceWorkPermitDoc<IReplaceWorkPermit>>
  removeManyReplaceWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IReplaceWorkPermitDoc<IReplaceWorkPermit[]>>
  removeAllReplaceWorkPermits: (parent: any, args: any, context: any) => Promise<IReplaceWorkPermitDoc<string>>
}

export interface IReplaceWorkPermit extends IBasicDoc {
  work_permit_id: string;
  service_id: string;
  permit_status: PermitStatus;
  reason_type: IReplaceReasonType;
  police_report: string;
  passport_image: string;
  damaged_permit: string;
}

export interface IReplaceWorkPermitDoc<IDataType> extends IBasicDocument<IDataType> {}


export interface IReplaceWorkPermitInput {
  work_permit_id: string;
  service_id: string;
  reason_type: IReplaceReasonType;
  police_report: string;
  passport_image: string;
  damaged_permit: string;
}


export interface IReplaceWorkPermitEdit {
  _id: string
  work_permit_id?: string;
  service_id?: string;
  permit_status?: PermitStatus;
  reason_type?: IReplaceReasonType;
  police_report?: string;
  passport_image?: string;
  damaged_permit?: string;
}

export interface IPostReplaceWorkPermit {
  input: IReplaceWorkPermitInput
}

export interface IEditReplaceWorkPermit {
  input: IReplaceWorkPermitEdit
}

export enum IReplaceReasonType {
  LOST = "LOST",
  DAMAGED = "DAMAGED"
}