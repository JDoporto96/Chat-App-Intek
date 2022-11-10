const authHost = "http://localhost:5000/api/auth";
export const registerRoute = `${authHost}/register`
export const loginRoute = `${authHost}/login`
export const dashboardRoute = `${authHost}/dashboard`
export const authorizationRoute = `${authHost}/authorize`


const profilesHost = "http://localhost:5001/api/profiles";
export const profilesAPIRoute = `${profilesHost}`


export const messagesHost = "http://localhost:5002/api/messages";
export const groupsHost = "http://localhost:5002/api/groups";
export const conversationsHost = "http://localhost:5002/api/conversations";

export const sendMessageRoute = `${messagesHost}/addmsg`
export const getAllMessagesRoute = `${messagesHost}`

export const getMyGroupsRoute = `${groupsHost}/mygroups`
export const createGroupRoute = `${groupsHost}/creategroup`
export const addAdminsRoute = `${groupsHost}/addadmins`
export const removeAdminsRoute = `${groupsHost}/removeadmins`
export const removeMembersRoute = `${groupsHost}/removemembers`
export const addMembersRoute = `${groupsHost}/addmembers`
export const deleteGroupRoute = `${groupsHost}/deleteGroup`
export const renameGroupRoute = `${groupsHost}/updategroupname`

export const conversationsRoute = `${conversationsHost}`
export const newConversationRoute = `${conversationsHost}/newconversation`





