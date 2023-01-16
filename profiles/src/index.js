require("dotenv").config();
const express = require('express');
const profileRoutes = require('./routes/profileRoutes');
const morgan = require('morgan');

//Init
const app= express();
require('./config/db');


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/api", profileRoutes)


app.listen(process.env.PORT, () => {
    console.log( `Server started on port ${process.env.PORT}`)
})