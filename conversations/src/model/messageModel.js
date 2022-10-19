const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    conversationId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    message: {
      type: String, 
      required: true 
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);