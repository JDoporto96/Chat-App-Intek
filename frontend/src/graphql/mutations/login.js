import { gql } from "@apollo/client";

const LOGIN = gql`
mutation Mutation($input: UserCredentials!) {
  logIn(input: $input) {
    error
    success
    token
    user {
      _id
      username
    }
  }
}
`;

export default LOGIN;
