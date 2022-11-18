import { gql } from "@apollo/client";

const SEND_REQUEST = gql`
mutation Mutation($receiverUsername: String!) {
  sendContactRequest(receiverUsername: $receiverUsername) {
    error
    message
    success
  }
}
`;

export default SEND_REQUEST;
