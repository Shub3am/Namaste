const express = require("express");
const { Server } = require("socket.io");
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
io.on("connection", (socket) => {
  socket.emit("Hello", "Welcome to my Server!!");
  socket.on("New_User", () => {
    Room[socket.id] = { messages: [] };
  });
  socket.on("message", (message) => {
    Room[socket.id].messages.push(message);
    all_messages = [];
    for (user of Object.keys(Room)) {
      Room[user].messages.forEach((single_message) => {
        all_messages.push(`${user} said ${single_message}`);
      });
    }
    socket.emit("all_messages", all_messages);
  });
});

httpmodule.listen("3000");
