require("dotenv").config();
const express = require('express');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const morgan = require('morgan');
const cors = require("cors");
const socket = require('socket.io');

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


const server = app.listen(process.env.PORT, () => {
    console.log( `Server started on port ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) =>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        console.log(userId);
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) =>{
        const sendUserSocketsList = data.to.map(user =>onlineUsers.get(user));
        sendUserSocketsList.forEach(user=>{
            if(user){
                socket.to(user).emit("msg-recieve", {message:data.message, from:data.from})
            };
        })
        
            // const sendUserSocket=onlineUsers.get(data.to[0]);
            // if(sendUserSocket){
            //     socket.to(sendUserSocket).emit("msg-recieve", {message:data.message, from:data.from})
            // };
    });
});



