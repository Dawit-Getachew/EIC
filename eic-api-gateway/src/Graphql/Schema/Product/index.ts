import { gql } from "apollo-server-express"
import { ProductActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, postMany, removeAll, removeMany, removeOne }
} = ProductActions

export default gql`
  extend type Query {
    ${fetchAll}: [IProduct]
    ${fetchOneByID}(_id: ID!): IProduct
    ${fetchManyByID}(_ids: [ID!]!): [IProduct]
  }

  extend type Mutation {
    ${post}(input: IProductInput): IProductResponse
    ${postMany}(input: InputManyProducts): [IProduct]
    ${edit}(input: IProductEdit): IProductResponse
    ${removeOne}(_id: ID!): IProduct
    ${removeMany}(_ids: [ID!]!): [IProduct]
    ${removeAll}: String
  }

  union IProductResponse = IProductSimple | SystemError | ValidationError | ValidationErrors

  type IProduct {
    _id: ID
    product_name: String
    is_service: Boolean
    quantity: Int
    unit: Unit
    domestic_market_share: Float
    export_market_share: Float
    createdAt: Date
    updatedAt: Date
  }

  type IProductSimple {
    _id: ID
    product_name: String
    is_service: Boolean
    quantity: Int
    unit: Unit
    domestic_market_share: Float
    export_market_share: Float
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IProductInput {
    product_name: String!
    is_service: Boolean!
    quantity: Int!
    unit: Unit!
    domestic_market_share: Float!
    export_market_share: Float!
  }

  input IProductEdit {
    _id: ID!
    product_name: String
    is_service: Boolean
    quantity: Int
    unit: Unit
    domestic_market_share: Float
    export_market_share: Float
  }

  input InputManyProducts {
    products: [IProductInput]
  }

`