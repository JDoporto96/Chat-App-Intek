import { gql } from "@apollo/client";

const CREATE_CONV = gql`
mutation Mutation($input: NewConversationInput) {
  createConversation(input: $input) {
    success
  }
}
`;

export default CREATE_CONV;
