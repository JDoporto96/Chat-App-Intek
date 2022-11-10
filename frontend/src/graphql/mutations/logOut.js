import { gql } from "@apollo/client";

const LOG_OUT = gql`
mutation Mutation($input: String!) {
    logOut(input: $input) {
      success
    }
  }
`;

export default LOG_OUT;
