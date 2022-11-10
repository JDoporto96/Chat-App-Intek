import { gql } from "@apollo/client";

const GET_USER_CONV = gql`
query Query{
    getUserConversations{
        _id
        members
        name
        admins
    }
  }
`;

export default GET_USER_CONV;
