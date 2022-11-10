import { gql } from "@apollo/client";

const CREATE_NEW_USER = gql`
  mutation Mutation($input: NewUserInput!) {
    createUser(input: $input) {
      success
    }
  }
`;

export default CREATE_NEW_USER;
