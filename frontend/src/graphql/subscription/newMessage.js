import { gql } from "@apollo/client";


const MESSAGES_SUBSCRIPTION = gql`
    subscription Subscription($conversationId: ID!) {
    newMessage(conversationId: $conversationId) {
      _id
      createdAt
      message
      sender
      conversationId
    }
  }
`;

export default MESSAGES_SUBSCRIPTION;