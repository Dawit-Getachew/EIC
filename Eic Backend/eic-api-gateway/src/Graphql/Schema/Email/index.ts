import { gql } from "apollo-server-express"
import { EmailActions } from "./action"

const {
  Mutation: { post }
} = EmailActions

export default gql`
  extend type Mutation {
    ${post}(input: IEmailInput): IEmailSimple
  }

  union IEmailResponse = IEmailSimple | SystemError | ValidationError | ValidationErrors

  type IEmail {
    accepted: [String]
    rejected: [String]
    envelopeTime: Float
    messageTime: Float
    messageSize: Float
    response: String
    messageId: String
  }

  type IEmailSimple {
    accepted: [String]
    rejected: [String]
    envelopeTime: Float
    messageTime: Float
    messageSize: Float
    response: String
    messageId: String
  }

  input IEmailInput {
    emailAddress: String
    subject: String
    html: String
  }

`