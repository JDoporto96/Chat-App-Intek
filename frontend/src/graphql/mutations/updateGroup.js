import { gql } from "@apollo/client";

const UPDATE_GROUP = gql`
mutation Mutation($input: UpdateGroupInput) {
    updateGroup(input: $input) {
      success
    }
  }

`;

export default UPDATE_GROUP;
