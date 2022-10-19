const Messages = require("../model/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find({
      conversationId: req.params.conversationId
    }).sort({ updatedAt: 1 });
    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.addMessage = async (req, res, next) => {
  const newMessage = new Messages(req.body)
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage)

  } catch (err) {
    res.status(500).json(err);
  }
};