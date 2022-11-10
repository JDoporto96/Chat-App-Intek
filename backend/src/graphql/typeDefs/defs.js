import { gql } from "apollo-server-core";

const defs = gql`
type ActionResponse {
    success: Boolean!
    error: String
}
type MessageActionResponse {
    success: Boolean!
    error: String
    message:Message
}
type LoginActionResponse {
    success: Boolean!
    error: String
    token: String
    user:User
}
type NewConversationActionResponse {
    conversation: Conversation
    success: Boolean!
    error: String
}
type User {
    _id: ID!
    username: String!
    status: String
    contacts:[Contact]!
}

type Conversation {
    _id: ID!
    name: String
    admins: [String]
    members: [String]!
}

type Message {
    _id: ID!
    sender: ID!
    message: String!
    createdAt: String!
  }

type Contact{
    _id: ID!
    username:String!
    request: Request
}

type Request {
    from: ID!
    status: String!
}

type Subscription {
    newMessage(conversationId: String!): Message!
    contactRequest: String!
  }

`

export default defs

