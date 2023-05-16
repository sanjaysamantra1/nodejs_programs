let graphql = require("graphql").graphql;
let express = require("express");
const { graphqlHTTP } = require("express-graphql");
let toDoSchema = require("./ToDoSchema");
let app = express();

app.use("/todos", graphqlHTTP({ schema: toDoSchema, pretty: true,graphiql: true, }));

app.listen(5000, function (err) {
  console.log("GraphQL Server is now running on localhost:5000");
});

// graphiql:true   (Opens the UI)