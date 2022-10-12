import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "../../Common/interface";
import { PermitStatus } from "../WorkPermit/work_permit.types"

export { IBasicID, IBasicIDs }

export const GQLResponseTag = "IRenewWorkPermitSimple"

export interface IRenewWorkPermitResolver {
  Query: IRenewWorkPermitQuery
  Mutation: IRenewWorkPermitMutation
}

export interface IRenewWorkPermitQuery {
  fetchRenewWorkPermits: (parent: any, args: any, context: any) => Promise<IRenewWorkPermitDoc<IRenewWorkPermit[]>>
  fetchOneRenewWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IRenewWorkPermitDoc<IRenewWorkPermit>>
  fetchManyRenewWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IRenewWorkPermitDoc<IRenewWorkPermit[]>>
}

export interface IRenewWorkPermitMutation {
  postRenewWorkPermit: (parent: any, args: IPostRenewWorkPermit, context: any) => Promise<IRenewWorkPermitDoc<IRenewWorkPermit>>
  editRenewWorkPermit: (parent: any, args: IEditRenewWorkPermit, context: any) => Promise<IRenewWorkPermitDoc<IRenewWorkPermit>>
  removeOneRenewWorkPermitByID: (parent: any, args: IBasicID, context: any) => Promise<IRenewWorkPermitDoc<IRenewWorkPermit>>
  removeManyRenewWorkPermitsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IRenewWorkPermitDoc<IRenewWorkPermit[]>>
  removeAllRenewWorkPermits: (parent: any, args: any, context: any) => Promise<IRenewWorkPermitDoc<string>>
}

export interface IRenewWorkPermit extends IBasicDoc {
  work_permit_id: string;
  tranining_document: string;
  service_id: string;
  permit_status: PermitStatus;
}

export interface IRenewWorkPermitDoc<IDataType> extends IBasicDocument<IDataType> {}


export interface IRenewWorkPermitInput {
  work_permit_id: string;
  tranining_document: string;
  service_id: string;
}


export interface IRenewWorkPermitEdit {
  _id: string
  work_permit_id?: string;
  tranining_document?: string;
  service_id?: string;
  permit_status?: PermitStatus;
}

export interface IPostRenewWorkPermit {
  input: IRenewWorkPermitInput
}

export interface IEditRenewWorkPermit {
  input: IRenewWorkPermitEdit
}