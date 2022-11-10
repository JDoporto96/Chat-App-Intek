import axios from 'axios';
import { profilesAPIRoute, getAllMessagesRoute,conversationsRoute, getMyGroupsRoute } from '../../utils/APIRoutes';

const queryResolvers ={
  Query:{
    me:(root,args,context)=>{
        return context.currentUser
    },
    searchProfile: async(_,args)=>{

        const {_id} = args
        try{
            const response = await axios.get(`${profilesAPIRoute}/${_id}`)
            if(!response.data.status){
                return {success: false, error: response.data.msg}
            }
            const profile = response.data
            return profile
        }catch(err){
            return {success: false}
        }
        
    },
    getContacts: async(_,args, context)=>{
        const _id = context.currentUser._id;
        try{
            const response = await axios.get(`${profilesAPIRoute}/${_id}/contacts`)
            const contacts = response.data
            return contacts
        }catch(err){
            return
        }
    },
    getRequests: async(_,args,context)=>{
        const _id = context.currentUser._id;
        try{
            const response = await axios.get(`${profilesAPIRoute}/${_id}/requests`)
            const requests = response.data
            return requests
        }catch(err){
            return 
        }
    },
    getConversation: async(_,input)=>{
        const {conversationId} = input;
        try{
            const response = await axios.get(`${getAllMessagesRoute}/${conversationId}`)
            const messages = response.data
            return messages
        }catch(err){
            return 
        }
    },
    getUserConversations: async(_,input,context)=>{
        const userId = context.currentUser._id;
        try{
            const response = await axios.get(`${conversationsRoute}/${userId}`)
            const conversations = response.data
            return conversations
        }catch(err){
            return 
        }
    },
    getUserGroups: async(_,input,context)=>{
        const userId = context.currentUser._id;
        try{
            const response = await axios.get(`${getMyGroupsRoute}/${userId}`)
            const conversations = response.data
            return conversations
        }catch(err){
            return 
        }
    }

  }
    
};

export default queryResolvers;