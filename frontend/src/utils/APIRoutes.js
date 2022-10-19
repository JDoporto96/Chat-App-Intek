const authHost = "http://localhost:5000";
export const registerRoute = `${authHost}/api/auth/register`
export const loginRoute = `${authHost}/api/auth/login`
export const dashboardRoute = `${authHost}/api/auth/dashboard`


const profilesHost = "http://localhost:5001";
export const profilesAPIRoute = `${profilesHost}/api/profiles`


export const messagesHost = "http://localhost:5002";

export const sendMessageRoute = `${messagesHost}/api/messages/addmsg`
export const getAllMessagesRoute = `${messagesHost}/api/messages/`

export const getMyGroupsRoute = `${messagesHost}/api/groups/mygroups`
export const createGroupRoute = `${messagesHost}/api/groups/creategroup`
export const addAdminsRoute = `${messagesHost}/api/groups/addadmins`
export const removeAdminsRoute = `${messagesHost}/api/groups/removeadmins`
export const removeMembersRoute = `${messagesHost}/api/groups/removemembers`
export const addMembersRoute = `${messagesHost}/api/groups/addmembers`
export const deleteGroupRoute = `${messagesHost}/api/groups/deleteGroup`
export const renameGroupRoute = `${messagesHost}/api/groups/updategroupname`

export const conversationsRoute = `${messagesHost}/api/conversations/`
export const newConversationRoute = `${messagesHost}/api/conversations/newconversation`

export const socketsHost = "http://localhost:5050"




