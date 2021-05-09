const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const users = [
  {
    id: 1,
    name: 'Vlad'
  },
  {
    id: 2,
    name: 'Max'
  },
]

const schema = buildSchema(`
  type User {
    id: Int!
    name: String!
  }
  type Query {
    user(id: Int!): User
  }
`)

const root = {
  user: (args) => {
    const {id} = args;
    return users.find((user) => user.id === id);
  }
};

const port = 5000;
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port);

console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);