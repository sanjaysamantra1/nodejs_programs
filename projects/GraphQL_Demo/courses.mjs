var express = require("express")
var cors = require('cors')
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema, GraphQLList } = require("graphql")
var { ruruHTML } = require("ruru/server")

// GraphQL Schema
let courseSchema = buildSchema(`
    type Query{
        course(id:Int):Course
        courses:[Course]
    }
    type Course{
        id:Int,
        title:String
        author:String
        description:String
        topic:String
        url:String
    }
`);

let coursesData = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/",
  },
  {
    id: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/",
  },
  {
    id: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
  },
];

let getCourse = function (args) {
    let id = args.id;
    return coursesData.find(course => course.id == id);
}
let getAllCourses = function () {
    return coursesData;
}
let root = {
    course: getCourse,
    courses: getAllCourses
}

// express
let app = express();
app.use(cors());

app.all(
    "/courses",
    createHandler({
        schema: courseSchema,
        rootValue: root,
    })
)

// Serve the GraphiQL IDE.
app.get("/", (req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/courses" }))
});

// Start the server at port
app.listen(5000)
console.log("Running a GraphQL API server at http://localhost:5000/courses")


/* {coursess {
  id,title,author
}} */

/* {course(id:1) {
  id,title,author
}} */