import { gql } from "@apollo/client";

const GET_CONV = gql`
query Query($conversationId: String!) {
    getConversation(conversationId: $conversationId) {
      _id
      sender
      message
      createdAt
    }
  }
`;

export default GET_CONV;
