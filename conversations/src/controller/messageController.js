const Messages = require("../model/messageModel");
const Conversations = require("../model/conversationModel")
const logger = require('../utils/logger');

module.exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find({
      conversationId: req.params.conversationId
    }).sort({ updatedAt: 1 });
    logger.info(`Fetching messages from conversation with id: ${ req.params.conversationId}`) 
    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json({status:false, msg:err});
  }
};

module.exports.addMessage = async (req, res, next) => {
  const{conversationId, sender} = req.body;
  try {
    const conversation = await Conversations.findOne({_id:conversationId});
    if (!conversation.members.includes(sender)){
      logger.info(`User:${sender} tried to send a
      messages to conversation with id: ${ conversationId} but is not part of the conversation`)
      return res.json({staus:false, msg:"Sender not in conversation"})
    }
    const newMessage = new Messages(req.body)
    const savedMessage = await newMessage.save();

    logger.info(`User:${req.body.sender} has sent a 
    messages to conversation with id: ${ req.body.conversationId}`) 
    

    return res.json(savedMessage)

  } catch (err) {
    res.status(500).json(err);
  }
};