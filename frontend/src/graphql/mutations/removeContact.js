import { gql } from "@apollo/client";

const REMOVE_CONTACT = gql`
mutation Mutation($contactId: String!) {
    removeContact(contactId: $contactId) {
    error
    message
    success
  }
}



`;

export default REMOVE_CONTACT;
