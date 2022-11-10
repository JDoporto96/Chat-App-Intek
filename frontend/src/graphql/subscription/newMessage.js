import { gql } from "@apollo/client";

const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription Subscription($conversationId: String!) {
    newMessage(conversationId: $conversationId) {
      _id
      createdAt
      message
      sender
    }
  }
`;

export default NEW_MESSAGE_SUBSCRIPTION;
