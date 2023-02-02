import { gql } from "@apollo/client";

const UPDATE_GROUP = gql`
mutation Mutation($input: UpdateGroupInput) {
  updateGroup(input: $input) {
    conversation {
      _id
      name
      members
    }
    message
    success
    error
  }
}
`;

export default UPDATE_GROUP;
