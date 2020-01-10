import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    dummy: String
  }

  type Mutation {
    createMessage(name: String, phoneNumber: String, email: String!, text: String!): Message!
  }

  type Message {
    name: String
    phoneNumber: String
    email: String!
    text: String!
  }
`);
