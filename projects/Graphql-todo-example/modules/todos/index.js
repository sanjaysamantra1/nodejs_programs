const { gql } = require('apollo-server-express');
const createTodo = require('./mutations/create-todo');
const updateTodo = require('./mutations/update-todo');
const removeTodo = require('./mutations/delete-todo');
const todo = require('./queries/todo');
const todos = require('./queries/todos');

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String
    description: String
    user: User
  }

  input CreateTodoInput {
    title: String!
    description: String
    isCompleted: Boolean
  }

  input UpdateTodoInput {
    title: String
    description: String
    isCompleted: Boolean
  }

  extend type Query {
    todo(id: ID): Todo!
    todos: [Todo!]
  }

  extend type Mutation {
    createTodo(input: CreateTodoInput!): Todo
    updateTodo(id: ID!, input: UpdateTodoInput!): Todo
    removeTodo(id: ID!): Todo
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  // Resolvers for Queries
  Query: {
    todo,
    todos,
  },

  // Resolvers for Mutations
  Mutation: {
    createTodo,
    updateTodo,
    removeTodo,
  },
};

module.exports = { typeDefs, resolvers };
