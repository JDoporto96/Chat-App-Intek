require("dotenv").config();
const express = require('express');
const userRoutes = require('./routes/users');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");

//Init
const app= express();
require('../config/db');
require('../config/passport')(passport);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(userRoutes)


app.listen(process.env.PORT, () => {
    console.log( `Server started on port ${process.env.PORT}`)
})