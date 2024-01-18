import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {cors: true});

io.use(async (socket, next) => {
    const sockets = await io.fetchSockets()
    let connectedUsers = sockets.map(user=>{ return {id: user.id, userName: user.data.userName}})
    socket.data.users = connectedUsers
    next()
  });


io.on("connection", (socket) => {
    socket.emit("firstConnect", socket.id)
    socket.on("registerUser", (userName)=> {
        socket.data.userName = userName
        socket.broadcast.emit("userAdded", {id: socket.id, userName})
        socket.emit("getUsers", socket.data.users)
        
    })



socket.on("disconnect", ()=> {
    socket.broadcast.emit("userRemoved", socket.id)

    })
});

httpServer.listen(8000);