const User = require('../models/user');
const jwt = require('jsonwebtoken');


function issueJWT(user) {
    const _id = user._id;
  
    const expiresIn = '1d';
  
    const payload = {
      sub: _id,
      iat: Date.now()
    };
  
    const signedToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: expiresIn});
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
}


module.exports.issueJWT=issueJWT;

