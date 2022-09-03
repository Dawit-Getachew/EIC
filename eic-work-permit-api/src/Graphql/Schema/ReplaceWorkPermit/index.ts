import { gql } from "apollo-server-express"
import { ReplaceWorkPermitActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchMyReplacementWorkPermits },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = ReplaceWorkPermitActions

export default gql`
  extend type Query {
    ${fetchAll}: [IReplaceWorkPermit]
    ${fetchOneByID}(_id: ID!): IReplaceWorkPermit
    ${fetchManyByID}(_ids: [ID!]!): [IReplaceWorkPermit]
    ${fetchMyReplacementWorkPermits}(_id: ID!): [IReplaceWorkPermit]
  }

  extend type Mutation {
    ${post}(input: IReplaceWorkPermitInput): IReplaceWorkPermitResponse
    ${edit}(input: IReplaceWorkPermitEdit): IReplaceWorkPermitResponse
    ${removeOne}(_id: ID!): IReplaceWorkPermit
    ${removeMany}(_ids: [ID!]!): [IReplaceWorkPermit]
    ${removeAll}: String
  }

  union IReplaceWorkPermitResponse = IReplaceWorkPermitSimple | SystemError | ValidationError | ValidationErrors

  type IReplaceWorkPermit {
    _id: ID
    work_permit_id: String
    reason_type: IReplaceReasonType
    police_report: String
    passport_image: String
    damaged_permit: String
    service_id: String
    permit_status: WorkPermitStatus
    createdAt: Date
    updatedAt: Date
  }

  type IReplaceWorkPermitSimple {
    _id: ID
    work_permit_id: String
    reason_type: IReplaceReasonType
    police_report: String
    passport_image: String
    damaged_permit: String
    service_id: String
    permit_status: WorkPermitStatus
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                   

  input IReplaceWorkPermitInput {
    work_permit_id: String
    reason_type: IReplaceReasonType
    police_report: String
    passport_image: String
    damaged_permit: String
    service_id: String
  }

  input IReplaceWorkPermitEdit {
    _id: ID!
    work_permit_id: String
    reason_type: IReplaceReasonType
    police_report: String
    passport_image: String
    damaged_permit: String
    service_id: String
    permit_status: WorkPermitStatus
  }

  enum IReplaceReasonType {
    LOST, DAMAGED
  }

`