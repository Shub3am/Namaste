import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {cors: true});
let currentRoom = []
io.on("connection", (socket) => {
//   console.log(socket.id)
socket.join("room1")
currentRoom.push(socket.id)
socket.to("room1").emit("joined", currentRoom)
    socket.emit("firstConnect", `Hey ${socket.id}`)
    socket.broadcast.emit("newUser", socket.id )

    socket.on("disconnect", ()=> {
        let filterUser = currentRoom.filter(item => item !== socket.id)
        currentRoom = filterUser
        socket.broadcast.emit("userLeft", currentRoom)
    })
});

httpServer.listen(8000);