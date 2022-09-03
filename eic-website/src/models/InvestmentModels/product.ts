import { Units } from "src/common/enums";
import { IBasicDoc, IBasicID, IBasicIDs, IBasicDocument, IBusinessAddress } from "src/common/interface";

export type { IBasicID, IBasicIDs }

export const GQLResponseTag = "IProductSimple"

export interface IProductResolver {
  Query: IProductQuery
  Mutation: IProductMutation
}

export interface IProductQuery {
  fetchProducts: (parent: any, args: any, context: any) => Promise<IProductDoc<IProduct[]>>
  fetchOneProductByID: (parent: any, args: IBasicID, context: any) => Promise<IProductDoc<IProduct>>
  fetchManyProductsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IProductDoc<IProduct[]>>
}

export interface IProductMutation {
  postProduct: (parent: any, args: IPostProduct, context: any) => Promise<IProductDoc<IProduct>>
  editProduct: (parent: any, args: IEditProduct, context: any) => Promise<IProductDoc<IProduct>>
  removeOneProductByID: (parent: any, args: IBasicID, context: any) => Promise<IProductDoc<IProduct>>
  removeManyProductsByID: (parent: any, args: IBasicIDs, context: any) => Promise<IProductDoc<IProduct[]>>
  removeAllProducts: (parent: any, args: any, context: any) => Promise<IProductDoc<string>>
}

export interface IPermitProduct {
  name: string
  quantity: number
  local_share_market: number
  export_share_market: number
  unit: string
}

export interface IProduct extends IBasicDoc {
  product_name: string
  is_service: boolean
  quantity: number
  unit: Units
  domestic_market_share: number
  export_market_share: number
}

export interface IProductDoc<IDataType> extends IBasicDocument<IDataType> {}

export interface IProductInput {
  product_name: string
  is_service: boolean
  quantity: number
  unit: Units
  domestic_market_share: number
  export_market_share: number
}

export interface IProductEdit {
  _id: string
  product_name?: string
  is_service?: boolean
  quantity?: number
  unit?: Units
  domestic_market_share?: number
  export_market_share?: number
}

export interface IPostProduct {
  input: IProductInput
}

export interface IEditProduct {
  input: IProductEdit
}