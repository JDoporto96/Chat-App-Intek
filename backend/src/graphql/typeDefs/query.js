import { gql } from "apollo-server-core";

const query = gql`
type Query{
    me: User
    searchProfile (_id: String!): User!
    getContacts: [Contact]
    getRequests:[Contact]
    getUserConversations: [Conversation]
    getConversation (conversationId:String!): [Message]
    getUserGroups: [Conversation]

}
`

export default query

