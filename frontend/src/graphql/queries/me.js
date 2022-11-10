import { gql } from "@apollo/client";

const ME = gql`
query Query {
    me {
      _id
      status
      username
    }
  }
`;

export default ME;
