const express = require("express");
const port = 5000;
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listing to port ${port}`);
});
