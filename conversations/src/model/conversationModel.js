const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
    {
        name: {
            type:String,
            trim:true,
        },
        admins:{
            type:Array
        },
        members: {
            type:Array,
            required:true
        },
        isGroup:{
            type:Boolean,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Conversation", ConversationSchema);