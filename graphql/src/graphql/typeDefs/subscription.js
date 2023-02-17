
const subscriptionTypeDefs=`

type requestRespondedResponse {
    from: ID!
    to:ID!
    status:String
}
type friendDeletedResponse {
  exfriends:[ID!]
}

type Subscription {
  newMessage(conversationId: ID!): Message!
  newConversation: Conversation!
  updateGroup: Conversation!
  requestSend:Request!
  requestResponded:requestRespondedResponse!
  conversationDeleted:Conversation!
  friendDeleted:friendDeletedResponse!
}
`

export default subscriptionTypeDefs;