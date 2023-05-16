const express = require("express");
const port = 5000;
const app = express();
const { graphqlHTTP } = require("express-graphql");
const productSchema = require("./product-schema");

app.use(
  "/products",
  graphqlHTTP({
    schema: productSchema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listing to port ${port} http://localhost:5000/products`);
});

/* {Products(id:1){
  id,title,price
}} */