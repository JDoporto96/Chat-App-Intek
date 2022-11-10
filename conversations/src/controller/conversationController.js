const Conversations = require ('../model/conversationModel');
const logger = require('../utils/logger');

module.exports.newConversation = async(req,res,next)=>{
    try{
       const conversation = await Conversations.create({
        members:[req.body.senderId, req.body.receiverId],
       })
       logger.info(`New conversation created with id: ${conversation._id}`) 
       res.status(200).json(conversation)

    }catch(err){
        res.status(500).json(err)
    }
}

module.exports.getConversations = async(req,res,next)=>{
    try{
       const conversation = await Conversations.find({
        members: {
            $in: [req.params.userId]}
       })
       logger.info(`Fetching conversations from user: ${req.params.userId}`) 
       res.status(200).json(conversation)

    }catch(err){
        res.status(500).json(err)
    }
}
