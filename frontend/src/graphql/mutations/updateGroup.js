import { gql } from "@apollo/client";

const UPDATE_GROUP = gql`
mutation Mutation($input: UpdateGroupInput) {
  updateGroup(input: $input) {
    _id
    admins
    members
    name
  }
}
`;

export default UPDATE_GROUP;
