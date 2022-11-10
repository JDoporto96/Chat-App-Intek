import { gql } from "@apollo/client";

const SEARCH_PROFILE = gql`
query SearchProfile($id: String!) {
    searchProfile(_id: $id) {
      _id
      username
      status
    }
  }
`;

export default SEARCH_PROFILE;
