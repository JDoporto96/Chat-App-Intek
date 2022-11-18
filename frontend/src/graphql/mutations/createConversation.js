import { gql } from "@apollo/client";

const CREATE_CONV = gql`
mutation Mutation($receiverId: String!) {
  createConversation(receiverId: $receiverId) {
    conversation {
      _id
      members
    }
    success
    error
  }
}
`;

export default CREATE_CONV;
