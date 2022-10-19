require("dotenv").config();
const express = require('express');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const morgan = require('morgan');
const cors = require("cors");

//Init
const app= express();
require('../config/db');


//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/messages",messageRoutes);
app.use("/api/groups",groupRoutes);
app.use("/api/conversations", conversationRoutes)


const server = app.listen(process.env.PORT, () => {
    console.log( `Server started on port ${process.env.PORT}`)
})

