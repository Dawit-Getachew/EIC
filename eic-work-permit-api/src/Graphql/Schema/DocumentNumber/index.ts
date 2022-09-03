import { gql } from "apollo-server-express"
import { DocumentNumberActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = DocumentNumberActions

export default gql`
  extend type Query {
    ${fetchAll}: [IDocumentNumber]
    ${fetchOneByID}(_id: ID!): IDocumentNumber
    ${fetchManyByID}(_ids: [ID!]!): [IDocumentNumber]
  }

  extend type Mutation {
    ${post}(input: IDocumentNumberInput): IDocumentNumberResponse
    ${edit}(input: IDocumentNumberEdit): IDocumentNumberResponse
    ${removeOne}(_id: ID!): IDocumentNumber
    ${removeMany}(_ids: [ID!]!): [IDocumentNumber]
    ${removeAll}: String
  }

  union IDocumentNumberResponse = IDocumentNumberSimple | SystemError | ValidationError | ValidationErrors

  type IDocumentNumber {
    _id: ID
    ref_number: String
    document_number: String
    createdAt: Date
    updatedAt: Date
  }

  type IDocumentNumberSimple {
    _id: ID
    ref_number: String
    document_number: String
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                   

  input IDocumentNumberInput {
    ref_number: String!
  }

  input IDocumentNumberEdit {
    _id: ID!
    ref_number: String
    document_number: String
  }

`