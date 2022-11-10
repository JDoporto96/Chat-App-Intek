import { gql } from "@apollo/client";

const RESPOND_REQUEST = gql`
  mutation Mutation($input: RespondRequestInput!) {
    respondContactRequest(input: $input) {
      success
    }
  }



`;

export default RESPOND_REQUEST;
