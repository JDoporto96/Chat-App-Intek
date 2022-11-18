import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
mutation Mutation($input: newMessageInput) {
  sendMessage(input: $input) {
    error
    message {
      _id
      createdAt
      message
      sender
    }
    success
  }
}
`;

export default SEND_MESSAGE;
