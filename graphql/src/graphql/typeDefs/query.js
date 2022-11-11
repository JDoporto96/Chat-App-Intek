const queryTypeDefs=`
type Query{
    me: User
    searchProfile (_id: ID!): User!
    getContacts: [Contact]
    getRequests:[Contact]
    getUserConversations: [Conversation]
    getConversation (conversationId:String!): [Message]
    getUserGroups: [Conversation]
}

`

export default queryTypeDefs;