import { gql } from "apollo-server-express"
import { RenewWorkPermitActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = RenewWorkPermitActions

export default gql`
  extend type Query {
    ${fetchAll}: [IRenewWorkPermit]
    ${fetchOneByID}(_id: ID!): IRenewWorkPermit
    ${fetchManyByID}(_ids: [ID!]!): [IRenewWorkPermit]
  }

  extend type Mutation {
    ${post}(input: IRenewWorkPermitInput): IRenewWorkPermitResponse
    ${edit}(input: IRenewWorkPermitEdit): IRenewWorkPermitResponse
    ${removeOne}(_id: ID!): IRenewWorkPermit
    ${removeMany}(_ids: [ID!]!): [IRenewWorkPermit]
    ${removeAll}: String
  }

  union IRenewWorkPermitResponse = IRenewWorkPermitSimple | SystemError | ValidationError | ValidationErrors

  type IRenewWorkPermit {
    _id: ID
    work_permit_id: String
    tranining_document: String
    service_id: String
    permit_status: WorkPermitStatus
    createdAt: Date
    updatedAt: Date
  }

  type IRenewWorkPermitSimple {
    _id: ID
    work_permit_id: String
    tranining_document: String
    service_id: String
    permit_status: WorkPermitStatus
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                   

  input IRenewWorkPermitInput {
    work_permit_id: String
    tranining_document: String
    service_id: String
  }

  input IRenewWorkPermitEdit {
    _id: ID!
    work_permit_id: String
    tranining_document: String
    service_id: String
    permit_status: WorkPermitStatus
  }

`