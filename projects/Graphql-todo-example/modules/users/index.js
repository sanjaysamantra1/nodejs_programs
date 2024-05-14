const { gql } = require('apollo-server-express');
const createUser = require('./mutations/create-user');
const updateUser = require('./mutations/update-user');
const removeUser = require('./mutations/delete-user');
const user = require('./queries/user');
const users = require('./queries/users');

const typeDefs = gql`
  type User {
    id: ID! # The "!" means required
    firstname: String
    lastname: String
    email: String
    username: String
  }

  input CreateUserInput {
    firstname: String!
    lastname: String
    email: String!
    username: String!
  }

  input UpdateUserInput {
    firstname: String
    lastname: String
  }

  extend type Query {
    user(id: ID): User!
    users: [User!]
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    removeUser(id: ID!): User
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  // Resolvers for Queries
  Query: {
    user,
    users,
  },

  // Resolvers for Mutations
  Mutation: {
    createUser,
    updateUser,
    removeUser,
  },
};

module.exports = { typeDefs, resolvers };
