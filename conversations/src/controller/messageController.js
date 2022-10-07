const Messages = require("../model/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to ,sendToGroup} = req.body;
    const searchParam = sendToGroup ? [to] : [from, to];
    const messages = await Messages.find({
        users: {
          $all: searchParam,
        },
      }).sort({ updatedAt: 1 });
  
      if(!messages){
        return res.status(404).send("Start a conversation")
      }
      const projectedMessages = messages.map((msg) => {
        const timestamp = `${msg.createdAt.getHours()}:${msg.createdAt.getMinutes()< 10 ? "0"+msg.createdAt.getMinutes() : msg.createdAt.getMinutes()} `
        return {
          fromSelf: msg.sender.toString() === from,
          sender: msg.sender.toString(),
          message: msg.message.text,
          timestamp 
        };
      });
      res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, sendToGroup } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: sendToGroup? [to] : [from, to],
      sender: from
    });
  
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    next(err);
  }
};