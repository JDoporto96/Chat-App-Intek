import { gql } from "apollo-server-express";

const subscriptions = gql`
  type subscription{
    newMessage(conversationId: ID!): Message
    
  } 
`;

export default subscriptions;
