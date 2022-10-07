const authHost = "http://localhost:5000";
export const registerRoute = `${authHost}/api/auth/register`
export const loginRoute = `${authHost}/api/auth/login`
export const dashboardRoute = `${authHost}/api/auth/dashboard`


const profilesHost = "http://localhost:5001";
export const profilesAPIRoute = `${profilesHost}/api/profiles`


export const messagesHost = "http://localhost:5002";
export const sendMessageRoute = `${messagesHost}/api/messages/addmsg`
export const getAllMessagesRoute = `${messagesHost}/api/messages/getmsgs`
export const getMyGroupsRoute = `${messagesHost}/api/groups/mygroups`
