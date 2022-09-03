import { gql } from "apollo-server-express"
import { ProjectActions } from "./action"

const {
  Query: { fetchAll, fetchManyByID, fetchOneByID },
  Mutation: { edit, post, removeAll, removeMany, removeOne }
} = ProjectActions

export default gql`
  extend type Query {
    ${fetchAll}: [IProject]
    ${fetchOneByID}(_id: ID!): IProject
    ${fetchManyByID}(_ids: [ID!]!): [IProject]
  }

  extend type Mutation {
    ${post}(input: IProjectInput): IProjectResponse
    ${edit}(input: IProjectEdit): IProjectResponse
    ${removeOne}(_id: ID!): IProject
    ${removeMany}(_ids: [ID!]!): [IProject]
    ${removeAll}: String
  }

  union IProjectResponse = IProjectSimple | SystemError | ValidationError | ValidationErrors

  type IProject {
    _id: ID
    title: String
    project_stage: ProjectStages
    environmental_impact: String
    project_summary: String
    address: IBusinessAddress
    category_sector: ID
    category_sub_sector: ID
    category_activity: ID
    category_investment_activity: ID
    createdAt: Date
    updatedAt: Date
  }

  type IProjectSimple {
    _id: ID
    title: String
    project_stage: ProjectStages
    environmental_impact: String
    project_summary: String
    address: IBusinessAddress
    category_sector: ID
    category_sub_sector: ID
    category_activity: ID
    category_investment_activity: ID
    createdAt: Date
    updatedAt: Date
  }                                                                                                                                                                                    

  input IProjectInput {
    title: String!
    project_stage: ProjectStages!
    environmental_impact: String!
    project_summary: String!
    address: InputBusinessAddress!
    category_sector: ID!
    category_sub_sector: ID!
    category_activity: ID!
    category_investment_activity: ID!
  }

  input IProjectEdit {
    _id: ID!
    title: String
    project_stage: ProjectStages
    environmental_impact: String
    project_summary: String
    address: InputBusinessAddress
    category_sector: ID
    category_sub_sector: ID
    category_activity: ID
    category_investment_activity: ID
  }

`