let express = require("express");
let cors = require("cors");
let app = express();
let { graphqlHTTP } = require("express-graphql");
let { buildSchema } = require("graphql");

app.use(cors());

// Construct a schema, using GraphQL schema language
let mySchema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
  hello: () => {
    return "Hello world!!!";
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: mySchema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(5000, () => {
  console.log("Running a GraphQL API server at http://localhost:5000/graphql");
});

// input: {hello}
