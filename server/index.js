import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {cors: true});

// io.use(async (socket, next) => {
//     console.log("Called")
//     const sockets = await io.fetchSockets()
//       let connectedUsers = sockets.map(user=>user.id)
//       io.broadcast("userChange", connectedUsers)
//   });
  

io.on("connection", (socket) => {
    socket.emit("firstConnect", socket.id)
    socket.on("registerUser", (userName)=> {
        socket.data.username = userName
        socket.broadcast.emit("userAdded", {id: socket.id, userName})
    })



socket.on("disconnect", ()=> {
    socket.broadcast.emit("userRemoved", {id: socket.id})

    })
});

httpServer.listen(8000);