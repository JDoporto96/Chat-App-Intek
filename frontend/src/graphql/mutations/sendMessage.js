import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation Mutation($input: newMessageInput) {
    sendMessage(input: $input) {
      success
    }
  }
`;

export default SEND_MESSAGE;
