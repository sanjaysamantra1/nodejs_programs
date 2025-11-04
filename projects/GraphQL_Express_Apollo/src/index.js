import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

// Connect to MongoDB
await mongoose.connect("mongodb://127.0.0.1:27017/nareshit_sept_2025");
console.log("✅ MongoDB connected");

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Start standalone server
const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
});

console.log(`🚀 Server ready at: ${url}`);
