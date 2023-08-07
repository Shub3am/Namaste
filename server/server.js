const express = require("express");
const { Server } = require("socket.io");
const { faker } = require("@faker-js/faker");
const { createServer } = require("http");
const path = require("path");
const { log } = require("./public/client-scripts/client");
const app = express();
const httpmodule = createServer(app);
const io = new Server(httpmodule);
app.use(express.static(path.join(__dirname + "/public")));
app.set("views", __dirname);
app.set("view engine", "ejs");
const Room = {};
app.get("/", (req, res) => {
  res.render("client", { welcome: "OK" });
});
app.get("/c", (req, res) => {
  res.json(Room);
});

const getAllMessages = (Room) => {
  Current_Room = Room;
  all_messages = [];
  for (user of Object.keys(Current_Room)) {
    Room[user].messages.forEach((single_message) => {
      all_messages.push(`${user} said ${single_message}`);
    });
  }
  return all_messages;
};
io.use((socket, next) => {
  socket.username = faker.internet.userName();
  next();
});
io.on("connection", (socket) => {
  Room[socket.username] = { userId: socket.id, messages: [] };

  socket.emit("First_Time", { data: getAllMessages(Room) });

  socket.on("message", (message) => {
    Room[socket.username].messages.push(message);
    const all_messages = getAllMessages(Room);
    socket.emit("all_messages", all_messages);
  });
});

httpmodule.listen("5000");
