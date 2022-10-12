import resolvers from "../Graphql/Resolver/"
import typeDefs from "../Graphql/Schema/"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLSchema } from "graphql"

const schema: GraphQLSchema =  makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: undefined
  }
})

export default schema