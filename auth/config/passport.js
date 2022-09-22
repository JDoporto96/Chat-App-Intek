
const User = require('../src/models/user');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const pub_key = process.env.ACCESS_TOKEN_SECRET;

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
            const user = await User.findOne({email});
  
            if (!user) {
                return done({msg: "User not found", status: false});
            }
  
            const isPasswordValid = await user.isValidPassword(password);
            if(!isPasswordValid){
                return done({msg: "Incorrect username or password", status: false});
            }
  
          return done(null, user,{msg: "Successful login", status: true} );
        } catch (err) {
          return done(err);
        }
      }
    )
  );

const options ={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: pub_key
};

const strategy = new JWTStrategy(options,
    async (token,done)=>{
        try{
            return done(null, token.user);
        }catch(err){
            done(err,null)
        }
    }
)

module.exports =(passport) =>{
    passport.use(strategy);
}