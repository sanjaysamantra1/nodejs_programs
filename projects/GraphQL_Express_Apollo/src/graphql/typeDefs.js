export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
    postsByUser(userId: ID!): [Post]
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User
    createPost(title: String!, content: String!, userId: ID!): Post
    deleteUser(id: ID!): String
    deletePost(id: ID!): String
  }
`;