import { gql } from "@apollo/client";

const GET_CONTACTS = gql`
query Query{
    getContacts{
      _id
      username
    }
  }
`;

export default GET_CONTACTS;
