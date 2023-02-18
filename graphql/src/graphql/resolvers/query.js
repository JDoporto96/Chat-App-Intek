import axios from 'axios';
import { profilesAPIRoute, getAllMessagesRoute,conversationsRoute,getMyGroupsRoute, conversationDataRoute } from '../../utils/APIRoutes.js';
import logger from '../../utils/logger.js';

const queryResolvers={
    Query:{
        me:(root,args,context)=>{
            const {currentUser} = context;
            if(!currentUser){
                return null
            }
            logger.info(`Fetching info for current user: ${currentUser._id}`)
            return currentUser
        },
        searchProfile: async(_,args)=>{
            const {_id} = args
            try{
                const response = await axios.get(`${profilesAPIRoute}/${_id}`);
                if(!response.data.status){
                    return {success: false, error: response.data.msg}
                }
                const profile = response.data
                logger.info(`Fetching info for current user: ${_id}`)
                return profile
            }catch(err){
                return {success: false}
            }
            
        },
        getContacts: async(_,args, context)=>{
            const {currentUser} = context;
            if(!currentUser){
                return null
            }
            const _id = currentUser._id;
            try{
                const response = await axios.get(`${profilesAPIRoute}/${_id}/contacts`)
                const contacts = response.data
                logger.info(`Fetching contacts for current user: ${_id}`)
                return contacts
            }catch(err){
                console.log(err)
                return
            }
        },
        getRequests: async(_,args,context)=>{
            const {currentUser} = context;
            if(!currentUser){
                return null
            }
            const _id = currentUser._id;
            try{
                const response = await axios.get(`${profilesAPIRoute}/${_id}/requests`)
                const requests = response.data
                logger.info(`Fetching requests for current user: ${_id}`)
                return requests
            }catch(err){
                return 
            }
        },
        getConversation: async(_,input,context)=>{
            const {currentUser} = context;
            if(!currentUser){
                return{success: false, error: "Please authenticate"}
            }
            const {conversationId} = input;
            
            try{
                const conv = await axios.get(`${conversationDataRoute}/${conversationId}`);
                if(!conv.data.members.includes(currentUser._id)){
                    return []
                }
                const response = await axios.get(`${getAllMessagesRoute}/${conversationId}`)
                const messages = response.data
                logger.info(`Fetching conversation: ${conversationId}`)
                return messages
            }catch(err){
                return 
            }
        },
        getUserConversations: async(_,input,context)=>{
            const {currentUser} = context;
            if(!currentUser){
                return null
            }
            const userId = currentUser._id;
            try{
                const response = await axios.get(`${conversationsRoute}/${userId}`)
                const conversations = response.data
                logger.info(`Fetching all conversations for user: ${userId}`)
                return conversations
            }catch(err){
                return 
            }
        },
        getUserGroups: async(_,input,context)=>{
            const {currentUser} = context;
            if(!currentUser){
                return null
            }
            const userId = currentUser._id;
            try{
                const response = await axios.get(`${getMyGroupsRoute}/${userId}`)
                const conversations = response.data
                logger.info(`Fetching all group conversation for user: ${userId}`)
                return conversations
            }catch(err){
                return 
            }
        }

    },
}

export default queryResolvers;