const router =require('express').Router();
const passport = require('passport');
const User = require('../models/user');
const{issueJWT}=require('../lib/utils')

router.get('/', (req,res,next)=>{
    res.send('index')
})

router.get('/register',  (req,res,next)=>{
    res.send('register')
})

router.post('/register', async(req,res,next)=>{
    try{ 
        const {username,email,password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.json({msg: "Username already used", status: false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({msg: "Email already used", status: false});
        }
        const newUser = new User(req.body);
        newUser.save()
        .then((user)=>{
            const token = issueJWT(user)
            res.json({status:true, user,token:token.token, expiresIn:token.expires});
        })
    }catch(err){
        next(err)
    }
})

router.get('/login', (req,res,next)=>{
    res.send('login')
})

router.post('/login', async (req,res,next)=>{
    try{ 
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({msg: "Incorrect username or password", status: false});
        }
        const isPasswordValid = await user.isValidPassword(password);
        if(!isPasswordValid){
            return res.json({msg: "Incorrect username or password", status: false});  
        }
        const token = issueJWT(user);
        return res.json({status: true, user,token:token.token, expiresIn:token.expires});
     }catch(err){
        next(err)
     }
})

router.get('/logout', async (req, res) => {

    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    })
})

router.get('/me', passport.authenticate('jwt',{session:false,}),(req,res,next)=>{
    res.send(`profile: ${ req.user.username}`)
})

router.get('/dashboard',passport.authenticate('jwt',{session:false}), (req,res,next)=>{
    res.send('dashboard')
})



module.exports = router;

