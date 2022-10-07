const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema(
    {
        groupName: {
            type:String,
            required:true,
            trim:true
        },
        admins:Array,

        members: Array,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Groups", GroupSchema);