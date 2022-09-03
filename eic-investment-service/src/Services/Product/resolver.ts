import { ProductModel } from "../../Models/Product/product.schema"
import { IProductResolver, IBasicID, IBasicIDs, IProduct, IProductDoc, IPostProduct, IEditProduct, GQLResponseTag } from "../../Models/Product/product.types"
import DBWrapper from "../../wrappers/APIGenerator"

const { Fetch, FetchOne, FetchMany, Create, Edit, Remove, RemoveAll, RemoveMany } = new DBWrapper(ProductModel, GQLResponseTag).getAPICalls()

const resolver: IProductResolver = {
  Query: {
    async fetchProducts(_: any, __: any, ___: any) {
      return await Fetch() as unknown as IProductDoc<IProduct[]>
    },

    async fetchOneProductByID(_: any, prop: IBasicID, ___: any) {
      return await FetchOne(prop._id) as unknown as IProductDoc<IProduct>
    },

    async fetchManyProductsByID(_: any, prop: IBasicIDs, ___: any) {
      return await FetchMany(prop._ids) as unknown as IProductDoc<IProduct[]>
    }
  },

  Mutation: {
    async postProduct(_: any, prop: IPostProduct, __: any) {
      return await Create(prop.input) as unknown as IProductDoc<IProduct>
    },

    async editProduct(_: any, prop: IEditProduct, __: any) {
      return await Edit(prop.input) as unknown as IProductDoc<IProduct>
    },

    async removeOneProductByID(_: any, prop: IBasicID, __: any) {
      return await Remove(prop._id) as unknown as IProductDoc<IProduct>
    },

    async removeManyProductsByID(_: any, prop: IBasicIDs, __: any) {
      return await RemoveMany(prop._ids) as unknown as IProductDoc<IProduct[]>
    },

    async removeAllProducts(_: any, __: any, ___: any) {
      return await RemoveAll() as unknown as IProductDoc<string>
    }
  }
}

export default resolver