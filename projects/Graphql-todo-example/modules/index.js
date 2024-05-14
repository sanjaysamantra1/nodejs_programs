const { gql } = require('apollo-server-express');
const users = require('./users');
const todos = require('./todos');
const { GraphQLScalarType } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = gql`
  scalar Time

  type Query {
    getVersion: String!
  }

  type Mutation {
    version: String!
  }
`;

const timeScalar = new GraphQLScalarType({
  name: 'Time',
  description: 'Time custom scalar type',
  serialize: (value) => value,
});

const resolvers = {
  Time: timeScalar,
  Query: {
    getVersion: () => `v1`,
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, users.typeDefs, todos.typeDefs],
  resolvers: [resolvers, users.resolvers, todos.resolvers],
});

module.exports = schema;
