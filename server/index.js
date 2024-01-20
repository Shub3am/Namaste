import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {cors: true});

io.use(async (socket, next) => {
    const sockets = await io.fetchSockets()
    let users = {}
    sockets.forEach(user=>{ users[user.id]={userName: user.data.userName,messages: user.data.messages}})
    socket.data.users = users
    next()
  });


io.on("connection", (socket) => {
    socket.emit("firstConnect", socket.id)
    socket.on("registerUser", (userName)=> {
        socket.data.userName = userName
        socket.data.messages = []
        socket.broadcast.emit("userAdded", {id: socket.id, userName, messages: []})
        socket.emit("getUsers", socket.data.users)
        
    })

    socket.on("sendMessage", ({receiverId, message, senderId})=> {
        socket.to(receiverId).emit("receiveMessage", {message, senderId})
    })



socket.on("disconnect", ()=> {
    socket.broadcast.emit("userRemoved", socket.id)

    })
});

httpServer.listen(8000);