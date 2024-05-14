const express = require('express');
const { ApolloServer } = require('apollo-server');
const schema = require('./modules');

const server = new ApolloServer({
  schema
});

server.listen({ port: 5000 }).then(({ url }) => console.log(`Server running at ${url}`));
