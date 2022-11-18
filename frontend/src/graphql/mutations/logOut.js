import { gql } from "@apollo/client";

const LOG_OUT = gql`
mutation Mutation {
  logOut {
    error
    message
    success
  }
}
`;

export default LOG_OUT;
