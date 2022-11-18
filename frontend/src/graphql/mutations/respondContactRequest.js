import { gql } from "@apollo/client";

const RESPOND_REQUEST = gql`
mutation Mutation($input: RespondRequestInput!) {
  respondContactRequest(input: $input) {
    error
    message
    success
  }
}



`;

export default RESPOND_REQUEST;
