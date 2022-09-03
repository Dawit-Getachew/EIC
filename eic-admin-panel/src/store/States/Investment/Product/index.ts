import { unResolveEntity } from "src/helpers/resolveEntity"
import {
  FetchProductsBody, FetchProductsBodyTag, CreateManyProductsBody, CreateManyProductsBodyTag,
  UpdateProductBody, UpdateProductBodyTag, RemoveProductBody, RemoveProductBodyTag
} from "./query"
import Axios from "axios"
import endPoints from "src/constants/endPoints"
import { IProductEdit, IProductInput } from "src/models/InvestmentModels/product"

export const stateName = "products"

const constants = {
  "FETCH_PRODUCTS": "FETCH_PRODUCTS",
  "SELECT_PRODUCT": "SELECT_PRODUCT",
  "REMOVE_PRODUCT": "REMOVE_PRODUCT",
}

const initialState = {
  products: [],
  selected_product: {}
}

export const reducer = (state = initialState, action: any) => {
  switch(action.type) {
    case constants.FETCH_PRODUCTS: {
      return {
        ...state, products: action.payload
      }
    }

    case constants.SELECT_PRODUCT: {
      return {
        ...state, selected_product: action.payload
      }
    }

    case constants.REMOVE_PRODUCT: {
      return {
        ...state, products: state.products.filter(item => String(item._id) !== String(action.payload._id))
      }
    }

    default: {
      return state
    }
  }
}

export const Selectors = {
  selectProducts: (state: any) => unResolveEntity(state, stateName).products,
  selectSelectedProduct: (state: any) => unResolveEntity(state, stateName).selected_product
}

export const API = {
  FetchProducts: (callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, FetchProductsBody())
      .then((res: any) => callback(null, res.data.data[FetchProductsBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  CreateManyProducts: (inputs: IProductInput[], callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, CreateManyProductsBody(inputs))
      .then((res: any) => callback(null, res.data.data[CreateManyProductsBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  EditProduct: (input: IProductEdit, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, UpdateProductBody(input))
      .then((res: any) => callback(null, res.data.data[UpdateProductBodyTag]))
      .catch((err: any) => callback(err, null))
  },
  RemoveProduct: (_id: string, callback = (err: any, data: any) => null) => {
    Axios.post(endPoints.baseURL, RemoveProductBody(_id))
      .then((res: any) => callback(null, res.data.data[RemoveProductBodyTag]))
      .catch((err: any) => callback(err, null))
  },
}

export const Actions = {
  FetchedProducts: (payload: any) => ({ type: constants.FETCH_PRODUCTS, payload }),
  SelectProduct: (payload: any) => ({ type: constants.SELECT_PRODUCT, payload }),
  RemoveProduct: (payload: any) => ({ type: constants.REMOVE_PRODUCT, payload }),
}