import { gql } from "@apollo/client";

const SEND_REQUEST = gql`
  mutation Mutation($input: SendRequestInput!) {
    sendContactRequest(input: $input) {
      success
      error
    }
  }
`;

export default SEND_REQUEST;
