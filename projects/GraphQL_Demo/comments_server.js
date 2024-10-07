const express = require("express")
const cors = require("cors")
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema } = require("graphql")
const { ruruHTML } = require("ruru/server");
const commentsArr = require('./comments.json');

const app = express();
app.use(cors());

// 1. Construct a schema, using GraphQL schema language
var commentSchema = buildSchema(`
    type Query {
      comments:[Comment]
      comment(id:Int):Comment
    }
    type Comment{
        id:Int
        postId:Int
        name:String
        email:String
        body:String
    } 
`);

// The root provides a resolver function for each API endpoint
let root = {
    comments: function () {
        return commentsArr;
    },
    comment: function (args) {
        const commentId = args.id;
        return commentsArr.find(comment => comment.id == commentId);
    }
}

app.all('/api/comments', createHandler({ schema: commentSchema, rootValue: root }));

// for graphQL UI
app.get("/", (req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/api/comments" }))
})

// Start the server at port
app.listen(5000)
console.log("Running a GraphQL API server at http://localhost:5000/api/comments")

