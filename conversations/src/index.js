require("dotenv").config();
const express = require('express');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
// const morgan = require('morgan');
const logger = require("./utils/logger");

//Init
const app= express();
require('./config/db');


//middlewares
app.use(express.json());

//Routes
app.use("/api/messages",messageRoutes);
app.use("/api/groups",groupRoutes);
app.use("/api/conversations", conversationRoutes)


const server = app.listen(process.env.PORT, () => {
    logger.info( `Server started on port ${process.env.PORT}`)
})

