
const tDefs = `
type User {
    _id: ID!
    username: String!
    status: String
}

type Message {
    _id: ID!
    sender: ID!
    message: String!
    createdAt: String!
    conversationId:ID!
}

type Conversation {
    _id: ID!
    name: String
    admins: [String]
    members: [String]!
    isGroup: Boolean!
}

type Contact{
    _id: ID!
    username:String!
}

type Request {
    from: ID!
    senderUsername: String!
    to:String!
    status:String
}
`

export default tDefs

