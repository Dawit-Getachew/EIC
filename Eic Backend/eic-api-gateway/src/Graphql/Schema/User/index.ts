import { gql } from "apollo-server-express"
import { UserActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID, fetchUserInfoBySession, fetchUserByServiceID },
  Mutation: {
    edit, login, logout, post, removeAll, removeMany, removeOne,
    changeEmail, changePassword, changePhoneNumber, updateResidence
  }
} = UserActions

export default gql`
  extend type Query {
    ${fetchAll}: [IUser]
    ${fetchOneByID}(_id: ID!): IUser
    ${fetchManyByID}(_ids: [ID!]!): [IUser]
    ${fetchUserInfoBySession}: IUser
    ${fetchUserByServiceID}(_id: ID!): IUser
  }

  extend type Mutation {
    ${post}(input: IUserInput): IUserResponse
    ${edit}(input: IUserEdit): IUserResponse
    ${removeOne}(_id: ID!): IUser
    ${removeMany}(_ids: [ID!]!): [IUser]
    ${removeAll}: String
    ${login}(input: IUserSignin): IUserResponse
    ${logout}: ISignOutResponse
    ${changeEmail}(input: IUserChangeEmail): IUserResponse
    ${changePhoneNumber}(input: IUserChangePhoneNumber): IUserResponse
    ${changePassword}(input: IUserChangePassword): IUserResponse
    ${updateResidence}(input: IResidenceUpdate): IUserResponse
  }

  union IUserResponse = IUserSimple | SystemError | ValidationError | ValidationErrors | Message | UnAuthenticatedError | IUser
  union ISignOutResponse = Message | UnAuthenticatedError

  type IUser {
    _id: ID
    first_name: String
    middle_name: String
    last_name: String
    email: String
    gender: Gender
    role: String
    phone_number: String
    phone_number_type: String
    country: String
    city: String
    profile_picture: String
    business_profile: String
    service_id: String
    residence_form: ResidenceObject
    createdAt: Date
    updatedAt: Date
  }

  type IUserSimple {
    _id: ID
    first_name: String
    middle_name: String
    last_name: String
    email: String
    gender: Gender
    role: String
    phone_number: String
    phone_number_type: String
    country: String
    city: String
    profile_picture: String
    business_profile: String
    service_id: String
    residence_form: ResidenceObject
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IUserInput {
    first_name: String!
    middle_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    role: IRole!
    phone_number: String!
    password: String!
  }

  input IUserEdit {
    _id: ID!
    first_name: String
    last_name: String
    email: String
    gender: Gender
    phone_number: String
    phone_number_type: String
    country: String
    city: String
    profile_picture: String
    service_id: ID
  }

  input IUserSignin {
    phone_number: String!
    password: String!
  }

  input IUserChangeEmail {
    _id: String!
    email: String!
    password: String!
  }

  input IUserChangePhoneNumber {
    _id: String!
    phone_number: String!
    password: String!
  }

  input IUserChangePassword {
    _id: String!
    old_password: String!
    new_password: String!
  }

  input IResidenceUpdate {
    _id: ID!
    letter_of_support: String!
    visa_type: String!
    visa_image: String!
  }

  type ResidenceObject {
    letter_of_support: String
    visa_type: String
    visa_image: String
  }

`