const Messages = require("../model/messageModel");
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
  const newMessage = new Messages(req.body)
  try {
    const savedMessage = await newMessage.save();

    logger.info(`User:${req.body.sender} has sent a 
    messages to conversation with id: ${ req.body.conversationId}`) 
    

    res.status(200).json(savedMessage)

  } catch (err) {
    res.status(500).json(err);
  }
};