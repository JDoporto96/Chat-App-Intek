import { gql } from "@apollo/client";

const CREATE_GROUP_CONV = gql`
mutation Mutation($input: NewGroupInput) {
  createGroup(input: $input) {
    success
  }
}
`;

export default CREATE_GROUP_CONV;
