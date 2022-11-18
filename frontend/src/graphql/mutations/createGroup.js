import { gql } from "@apollo/client";

const CREATE_GROUP_CONV = gql`
mutation Mutation($input: NewGroupInput) {
  createGroup(input: $input) {
    conversation {
      _id
      name
      members
    }
    success
    error
  }
}
`;

export default CREATE_GROUP_CONV;
