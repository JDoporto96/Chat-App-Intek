import { gql } from "@apollo/client";

const GET_REQUEST = gql`
query Query {
  getRequests{
      _id
      username
    }
  }
`;

export default GET_REQUEST;
