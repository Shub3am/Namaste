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
app.get("/", (req, res) => {
  res.render("client", { welcome: "OK" });
});

io.on("connection", (socket) => {
  socket.emit("Hello", "Welcome to my Server!!");
  socket.on("Hello", (data) => {
    console.log(data);
  });
});

httpmodule.listen("3000");
