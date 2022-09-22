require("dotenv").config();
const express = require('express');
const profileRoutes = require('./routes/profiles');
const morgan = require('morgan');
const cors = require("cors");

//Init
const app= express();
require('../config/db');


//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use(profileRoutes)


app.listen(process.env.PORT, () => {
    console.log( `Server started on port ${process.env.PORT}`)
})