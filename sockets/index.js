const io = require('socket.io')(5050,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

let users = [];

const addUser =(userId, socketId) =>{
    if(!users.some(user => user.userId === userId)){
        users.push({userId, socketId})
    } 
       
};

const removeUser =(socketId) =>{
    users = users.filter(user =>user.socketId !== socketId)
}

const getUser =(userId)=>{
    return users.find(user => user.userId === userId)
}

io.on("connection", (socket) =>{
    console.log("A user has connected")

    socket.on("add-user", (userId)=>{
        addUser(userId, socket.id);
        io.emit("getUsers",users)
    });

    socket.on("disconnect", ()=>{
        console.log("A user has disconnected");
        removeUser(socket.id)
    })


    socket.on("send-msg", ({from, to, message, timestamp})=>{
        const user = getUser(to);
        console.log(user)
        if(user){
            console.log(user.socketId)
            io.to(user.socketId).emit("get-msg",{
                from,
                message,
                timestamp
            })
        }
        
    })
    // socket.on("send-msg", (data) =>{
    //     const sendUserSocketsList = data.to.map(user =>onlineUsers.get(user));
    //     sendUserSocketsList.forEach(user=>{
    //         if(user){
    //             socket.to(user).emit("msg-recieve", {message:data.message, from:data.from})
    //         };
    //     })
        
    // });
});



