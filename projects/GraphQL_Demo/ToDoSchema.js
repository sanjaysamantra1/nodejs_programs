let graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
} = graphql;

let allTodos = [
  {
    id: 1,
    title: "Read emails",
    completed: false,
  },
  {
    id: 2,
    title: "Buy orange",
    completed: true,
  },
  {
    id: 3,
    title: "Complete Assignment",
    completed: false,
  },
];

let TodoType = new graphql.GraphQLObjectType({
  name: "todo",
  fields: function () {
    return {
      id: {
        type: graphql.GraphQLID,
      },
      title: {
        type: graphql.GraphQLString,
      },
      completed: {
        type: graphql.GraphQLBoolean,
      },
    };
  },
});

let queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      todos: {
        type: new graphql.GraphQLList(TodoType),
        resolve: function () {
          return allTodos;
        },
      },
    };
  },
});

module.exports = new graphql.GraphQLSchema({
  query: queryType,
});
