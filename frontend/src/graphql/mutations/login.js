import { gql } from "@apollo/client";

const LOGIN = gql`
mutation LogIn($input: UserCredentials!) {
  logIn(input: $input) {
    error
    success
    token
  }
}
`;

export default LOGIN;
