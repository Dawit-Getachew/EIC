import { gql } from "apollo-server-express"
import { CancelWorkPermitActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchMyCancelmentWorkPermits },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = CancelWorkPermitActions

export default gql`
  extend type Query {
    ${fetchAll}: [ICancelWorkPermit]
    ${fetchOneByID}(_id: ID!): ICancelWorkPermit
    ${fetchManyByID}(_ids: [ID!]!): [ICancelWorkPermit]
    ${fetchMyCancelmentWorkPermits}(_id: ID!): [ICancelWorkPermit]
  }

  extend type Mutation {
    ${post}(input: ICancelWorkPermitInput): ICancelWorkPermitResponse
    ${edit}(input: ICancelWorkPermitEdit): ICancelWorkPermitResponse
    ${removeOne}(_id: ID!): ICancelWorkPermit
    ${removeMany}(_ids: [ID!]!): [ICancelWorkPermit]
    ${removeAll}: String
  }

  union ICancelWorkPermitResponse = ICancelWorkPermitSimple | SystemError | ValidationError | ValidationErrors

  type ICancelWorkPermit {
    _id: ID
    work_permit_id: String
    reason_type: String
    service_id: String
    permit_status: WorkPermitStatus
    createdAt: Date
    updatedAt: Date
  }

  type ICancelWorkPermitSimple {
    _id: ID
    work_permit_id: String
    reason_type: String
    service_id: String
    permit_status: WorkPermitStatus
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                   

  input ICancelWorkPermitInput {
    work_permit_id: String
    reason_type: String
    service_id: String
  }

  input ICancelWorkPermitEdit {
    _id: ID!
    work_permit_id: String
    reason_type: String
    service_id: String
    permit_status: WorkPermitStatus
  }

`