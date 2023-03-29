require("dotenv").config();
const express = require('express');
const profileRoutes = require('./routes/profileRoutes');
const contactsRoutes = require('./routes/contactsRoutes')
const morgan = require('morgan');
const logger = require("./utils/logger");

//Init
const app= express();
require('./config/db');


// //middlewares
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/api/profiles", profileRoutes)
app.use("/api/profiles", contactsRoutes)


app.listen(process.env.PORT, () => {
    logger.info( `Server started on port ${process.env.PORT}`)
})