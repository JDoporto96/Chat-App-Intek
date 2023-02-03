
const subscriptionTypeDefs=`

type requestRespondedResponse {
    from: ID!
    to:ID!
    status:String
}

type Subscription {
  newMessage(conversationId: ID!): Message!
  newConversation: Conversation!
  updateGroup: Conversation!
  requestSend:Request!
  requestResponded:requestRespondedResponse!
}
`

export default subscriptionTypeDefs;