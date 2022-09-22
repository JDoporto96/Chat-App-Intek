const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        max: 20  
    }, 
    profilePicture:{
        type:String,
        default: "Profile_Pic.png"
    },
    contacts: [],
    status: {
        type: String,
        default: "Offline"
    }
},{
    timestamps:true
})



const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile