const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        max: 20
        
        
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        max: 50,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error({message:'Email is invalid'})
            }
        }
        
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Invalid password')
            }
        }

    },
},{
    timestamps:true
})

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}



//Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10)
    }

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User