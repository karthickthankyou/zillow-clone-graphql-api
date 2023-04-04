import { GraphQLClient } from 'graphql-request'

export const gqlClient = new GraphQLClient('http://localhost:3001/graphql')
