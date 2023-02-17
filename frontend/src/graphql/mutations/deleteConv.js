import { gql } from "@apollo/client";

const DELETE_CONV = gql`
mutation Mutation($conversationId: String!) {
    deleteConversation(conversationId: $conversationId) {
      error
      message
      success
    }
  }
`;

export default DELETE_CONV;
