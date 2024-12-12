const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
const app = express();

// create a graphql schema
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'Hello World !!',
            },
        },
    }),
});

/* call createHandler(Schema) */
app.all('/graphql', createHandler({ schema }));

// serve RURU ui
app.get('/', (req, res) => {
    res.end(ruruHTML({ endPoint: '/graphql' }))
})

app.listen(5000, () => {
    console.log(`Server Running at 5000 port`)
})