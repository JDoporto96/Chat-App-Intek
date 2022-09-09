
const User = require('../src/models/user');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const pub_key = process.env.ACCESS_TOKEN_SECRET;

const options ={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: pub_key
};

const strategy = new JWTStrategy(options,(payload,done)=>{
    User.findOne({_id:payload.sub})
        .then((user)=>{
           if(user){
            return done(null,user);
           } else{
            return done(null, false);
           }
        })
        .catch(err=>done(err,null))
})

module.exports =(passport) =>{
    passport.use(strategy);
}