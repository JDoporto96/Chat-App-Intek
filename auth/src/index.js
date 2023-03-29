require("dotenv").config();
const express = require('express');
const userRoutes = require('./routes/users');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const logger = require("./utils/logger");

//Init
const app= express();
require('./config/db');
require('./config/passport')(passport);

//middlewares
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", userRoutes)


const server = app.listen(process.env.PORT, () => {
    logger.info( `Server started on port ${process.env.PORT}`)
})