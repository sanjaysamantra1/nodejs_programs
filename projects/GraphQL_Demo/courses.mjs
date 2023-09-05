import express from "express";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";

// GraphQL schema
let schema = buildSchema(`
    type Query {
        course(id: Int!): Course
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
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
  return coursesData.filter((course) => {
    return course.id == id;
  })[0];
};

let root = {
  course: getCourse,
};
// Create an express server and a GraphQL endpoint
let app = express();
app.use(cors());

app.use("/courses", createHandler({ schema, rootValue: root, graphiql: true }));
app.listen(5000, () =>
  console.log(
    "Express GraphQL Server Now Running On http://localhost:5000/courses"
  )
);

/* {course(id:1) {
  id,title,author,topic
}} */

/* {
  courses(topic: "JavaScript") {
    id
    title
  }
} */
