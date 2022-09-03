import { GraphQLDateTime } from "graphql-iso-date"
import WorkPermit from './WorkPermit'
import Account from './Account'
import User from './User'
import RenewWorkPermit from './RenewWorkPermit'
import ReplaceWorkPermit from './ReplaceWorkPermit'
import CancelWorkPermit from './CancelWorkPermit'
import DocumentNumber from './DocumentNumber'
import Email from './Email'

const customScalar = {
  Date: GraphQLDateTime
}

export default [
  customScalar, WorkPermit, Account, User, RenewWorkPermit, ReplaceWorkPermit, CancelWorkPermit,
  DocumentNumber, Email
]