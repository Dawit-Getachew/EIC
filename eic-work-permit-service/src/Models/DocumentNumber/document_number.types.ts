import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument } from "../../Common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IDocumentNumberSimple"

export interface IDocumentNumberResolver {
  Query: IDocumentNumberQuery
  Mutation: IDocumentNumberMutation
}

export interface IDocumentNumberQuery {
  fetchDocumentNumbers: (parent: any, args: any, context: any) => Promise<IDocumentNumberDoc<IDocumentNumber[]>>
  fetchOneDocumentNumberByID: (parent: any, args: IBasicID, context: any) => Promise<IDocumentNumberDoc<IDocumentNumber>>
  fetchManyDocumentNumbersByID: (parent: any, args: IBasicIDs, context: any) => Promise<IDocumentNumberDoc<IDocumentNumber[]>>
}

export interface IDocumentNumberMutation {
  postDocumentNumber: (parent: any, args: IPostDocumentNumber, context: any) => Promise<IDocumentNumberDoc<IDocumentNumber>>
  editDocumentNumber: (parent: any, args: IEditDocumentNumber, context: any) => Promise<IDocumentNumberDoc<IDocumentNumber>>
  removeOneDocumentNumberByID: (parent: any, args: IBasicID, context: any) => Promise<IDocumentNumberDoc<IDocumentNumber>>
  removeManyDocumentNumbersByID: (parent: any, args: IBasicIDs, context: any) => Promise<IDocumentNumberDoc<IDocumentNumber[]>>
  removeAllDocumentNumbers: (parent: any, args: any, context: any) => Promise<IDocumentNumberDoc<string>>
}

export interface IDocumentNumber extends IBasicDoc {
  document_number: string;
  ref_number: string;
}

export interface IDocumentNumberDoc<IDataType> extends IBasicDocument<IDataType> {}


export interface IDocumentNumberInput {
  ref_number: string;
}


export interface IDocumentNumberEdit {
  document_number: string;
  ref_number: string;
}

export interface IPostDocumentNumber {
  input: IDocumentNumberInput
}

export interface IEditDocumentNumber {
  input: IDocumentNumberEdit
}