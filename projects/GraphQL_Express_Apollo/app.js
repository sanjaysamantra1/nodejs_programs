const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require('mongoose');

const { typeDefs, resolvers } = require("./product_schema");

async function startServer() {
    await mongoose.connect('mongodb://127.0.0.1/sept_2024');
    console.log('Database connection established');

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 5000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}
startServer();



