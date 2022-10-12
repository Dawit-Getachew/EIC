import { IRabbitMQServerMessage } from "../../Common/interface"
import { ProductRoutes } from "../../Common/routes"
import ProductResolver from "./resolver"
import { IBasicID, IBasicIDs, IPostProduct, IEditProduct } from "../../Models/Product/product.types"

export const ProductController = async (payload: IRabbitMQServerMessage) => {
  switch (payload.route) {
    case ProductRoutes.GET_ALL_PRODUCTS: {
      return await ProductService.fetchProducts()
    }

    case ProductRoutes.GET_ONE_PRODUCT: {
      return await ProductService.fetchOneProductByID(payload.data)
    }

    case ProductRoutes.GET_MANY_PRODUCTS_BY_ID: {
      return await ProductService.fetchManyProductsByID(payload.data)
    }

    case ProductRoutes.POST_PRODUCT: {
      return await ProductService.postProduct(payload.data)
    }

    case ProductRoutes.EDIT_PRODUCT: {
      return await ProductService.editProduct(payload.data)
    }

    case ProductRoutes.REMOVE_PRODUCT_BY_ID: {
      return await ProductService.removeOneProductByID(payload.data)
    }

    case ProductRoutes.REMOVE_MANY_PRODUCTS_BY_ID: {
      return await ProductService.removeManyProductsByID(payload.data)
    }

    case ProductRoutes.REMOVE_ALL_PRODUCTS: {
      return await ProductService.removeAllProducts()
    }

    default: return {}
  }
}

export class ProductService {
  static async fetchProducts() {
    return await (await ProductResolver.Query.fetchProducts({}, {}, {})).data
  }

  static async fetchOneProductByID(prop: IBasicID) {
    return await (await ProductResolver.Query.fetchOneProductByID({}, prop, {})).data
  }

  static async fetchManyProductsByID(prop: IBasicIDs) {
    return await (await ProductResolver.Query.fetchManyProductsByID({}, prop, {})).data
  }

  static async postProduct(prop: IPostProduct) {
    return await (await ProductResolver.Mutation.postProduct({}, prop, {})).data
  }

  static async editProduct(prop: IEditProduct) {
    return await (await ProductResolver.Mutation.editProduct({}, prop, {})).data
  }

  static async removeOneProductByID(prop: IBasicID) {
    return await (await ProductResolver.Mutation.removeOneProductByID({}, prop, {})).data
  }

  static async removeManyProductsByID(prop: IBasicIDs) {
    return await (await ProductResolver.Mutation.removeManyProductsByID({}, prop, {})).data
  }

  static async removeAllProducts() {
    return await (await ProductResolver.Mutation.removeAllProducts({}, {}, {})).data
  }
}